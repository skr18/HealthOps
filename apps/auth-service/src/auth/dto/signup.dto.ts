import { IsEmail, IsString, MinLength,IsNotEmpty } from 'class-validator';

export class SignupDto {
  @IsEmail({},{ message: 'Invalid email format' })
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(6,{message: 'Password must be at least 6 characters'})
  password!: string;
}