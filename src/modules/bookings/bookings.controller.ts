import { Controller, Post, Body, Request, UseGuards, Param, ParseIntPipe, Get } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { CreateBookingsDto } from './dto/create-bookings.dto';
import { BookingsEntity } from '../../models/bookings.entity';
import { JwtAuthGuard } from '../../providers/jwt-auth.guard';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('create/:id')
  @UseGuards(JwtAuthGuard)
  async createBooking(
    @Request() req,
    @Body() createBookingDto: CreateBookingsDto,
    @Param('id', ParseIntPipe) hotelID: number): Promise<BookingsEntity> {
    const userID = req.user.id;
    console.log("================\n"+userID+"================\n");
    return this.bookingService.createBooking(userID, hotelID, createBookingDto.room, createBookingDto.bookingDate);
  }

  @Get('hotel/:id')
  async getBookingsByHotelID(
    @Param('id', ParseIntPipe) hotelId: number,
  ): Promise<BookingsEntity[]> {
    return this.bookingService.getBookingsByHotelId(hotelId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getBookingsByUserID(@Request() req): Promise<BookingsEntity[]> {
    return this.bookingService.getBookingsByUserId(req.user.id)
  }
}
