import { Body, Controller, Post, Query, Version } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';


//“All APIs in this file will start with /auth”
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get('nickname-availability')
  @Version("1")
  checkNickname(@Query('nickname') nickname: string,) {
    return this.authService.checkNickname(nickname);
  }

  @Post('signup')
  @Version("1")
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @Version("1")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile() {
    return { message: 'User profil' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @Get("admin")
  adminRoute() {
    return { message: "Admin access only" }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("DOCTOR")
  @Get("doctor")
  doctorRoute() {
    return { message: "Doctor access only" }
  }

  //🔹 JwtAuthGuard --> ✔ verifies token  ✔ attaches user   🔹 RolesGuard --> ✔ checks permissions
}
