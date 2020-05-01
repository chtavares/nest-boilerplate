import { IsNotEmpty, IsString, IsEmail, Min } from 'class-validator';

export class StoreUserDto {
  @IsNotEmpty()
  @IsString()
  @Min(5)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEmail()
  @Min(8)
  password: string;
}
