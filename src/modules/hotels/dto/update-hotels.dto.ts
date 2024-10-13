import { IsOptional } from 'class-validator';

export class UpdateHotelsDto{
  @IsOptional()
  name?: string;

  @IsOptional()
  address?: string;
}
