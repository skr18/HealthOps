import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';



//This class can be injected (used) in other classes
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,private jwtService: JwtService,) {}

  async signup(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'PATIENT',
      },
    });
  }

  async login(email: string, passsword:string){
    const user = await this.prisma.user.findUnique({
      where:{email},
    })

    if(!user){
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(passsword,user.password)

    if(!isMatch){
      throw new Error("Invalid credentials")
    }

    const payload ={
      UserId: user.id,
      email: user.email,
      role: user.role
    }

    const token = this.jwtService.sign(payload)

    return{
      access_token: token
    }
  }

}

