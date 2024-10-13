import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelsEntity } from '../../models/hotels.entity';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../models/users.entity';
import { BookingsEntity } from '../../models/bookings.entity';
import { CreateBookingsDto } from './dto/create-bookings.dto';



@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingsEntity)
    private readonly bookingRepository: Repository<BookingsEntity>,

    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,

    @InjectRepository(HotelsEntity)
    private readonly hotelsRepository: Repository<HotelsEntity>,
  ) {}

  async createBooking( userId: number, hotelId: number, room: string, bookingDate: string): Promise<BookingsEntity> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const hotel = await this.hotelsRepository.findOne({ where: { id: hotelId } });
    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${hotelId} not found.`);
    }

    const existingBooking = await this.bookingRepository.findOne({
      where: {
        hotel: { id: hotelId },
        room: room,
        bookingDate: bookingDate,
      },
    });

    if (existingBooking) {
      throw new ConflictException(
        `Room ${room} already booked at ${bookingDate}.`,
      );
    }

    const booking = this.bookingRepository.create({
      user: user,
      hotel: hotel,
      room: room,
      bookingDate: bookingDate,
    });

    return await this.bookingRepository.save(booking);
  }

  async getBookingsByHotelId(hotelId: number): Promise<BookingsEntity[]> {
    const hotel = await this.hotelsRepository.findOne({
      where: { id: hotelId },
    });
    if (!hotel) {
      throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
    }

    return await this.bookingRepository.find({
      where: { hotel: { id: hotelId } },
      order: { bookingDate: 'ASC' },
    });
  }

  async getBookingsByUserId(userId: number): Promise<BookingsEntity[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return await this.bookingRepository.find({
      where: { user: { id: userId } },
      order: { bookingDate: 'ASC' },
    });
  }
}