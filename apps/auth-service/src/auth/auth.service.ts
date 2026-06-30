import { ForbiddenException, Injectable ,UnauthorizedException,ConflictException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';

//This class can be injected (used) in other classes
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService,) { }

  async checkNickname(nickname: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        nickname,
      },
    });

    return {
      available: !user,
    };
  }

  async signup(dto: SignupDto) {
    if (dto.role === "ADMIN") {
      throw new ForbiddenException(
        "Admin registration not allowed"
      );
    }
    try {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      return await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          nickname: dto.nickname,
          role: dto.role,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Look at which field caused the error
        const errorMessage = error.message || '';

        if (errorMessage.includes('email')) {
          throw new ConflictException('This email is already registered.');
        }

        if (errorMessage.includes('nickname')) {
          throw new ConflictException('This nickname is already taken.');
        }
        // Fallback just in case
        throw new ConflictException('An account with these details already exists.');
      }
      // If it's a completely different error (like database offline), throw it normally
      throw error;
    }
  }

  async login(email: string, passsword: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    })

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(passsword, user.password)

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      nickname: user.nickname
    }

    const token = this.jwtService.sign(payload,{  expiresIn: "15m",})

    return {
      access_token: token,
      user:{
        id:user.id,
        email:user.email,
        nickname:user.nickname,
        role:user.role
      }
    }
  }

}

//Access token = short-lived proof of identity
//Refresh token = long-lived session renewal mechanism
