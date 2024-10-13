import { Module } from '@nestjs/common';
import { BookingsEntity } from '../../models/bookings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsEntity } from '../../models/hotels.entity';
import { UsersEntity } from '../../models/users.entity';
import { BookingService } from './bookings.service';
import { BookingController } from './bookings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookingsEntity, UsersEntity, HotelsEntity])],
  providers: [BookingService],
  controllers: [BookingController],
  exports: [BookingService],
})
export class BookingsModule {}