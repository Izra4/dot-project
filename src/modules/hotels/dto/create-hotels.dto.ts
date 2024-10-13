import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateHotelsDto {
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @MinLength(5)
  address: string;
}
