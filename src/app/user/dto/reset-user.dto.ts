import { IsNotEmpty, Min } from 'class-validator';

export class ResetUserDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  @Min(8)
  password: string;
}
