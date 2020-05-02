import { IsNotEmpty, IsEmail, Min } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Min(8)
  password: string;
}
