import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateBookingsDto{
  @IsNotEmpty()
  room: string;

  @IsNotEmpty()
  bookingDate: string;
}