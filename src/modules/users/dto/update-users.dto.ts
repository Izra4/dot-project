import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUsersDto{
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(12)
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(8)
  password?: string;
}