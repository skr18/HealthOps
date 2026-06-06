import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';


//This class can be injected (used) in other classes
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService,) { }

  async signup(email: string, password: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'PATIENT',
      },
    });
  }

  async login(email: string, passsword: string) {
    console.log("email",email)
    console.log("email",passsword)
    const user = await this.prisma.user.findUnique({
      where: { email:email },
    })

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(passsword, user.password)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      UserId: user.id,
      email: user.email,
      role: user.role
    }

    const token = this.jwtService.sign(payload)

    return {
      access_token: token
    }
  }

}

