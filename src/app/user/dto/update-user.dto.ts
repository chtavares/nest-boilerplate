import { IsOptional, IsString, IsEmail, Min } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Min(5)
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Min(8)
  password: string;
}
