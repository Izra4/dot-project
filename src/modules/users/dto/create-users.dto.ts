import { IsEmail, IsNotEmpty, MIN, MinLength } from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(12)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}