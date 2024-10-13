import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUsersDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  password?: string;
}
