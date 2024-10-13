import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { HotelsEntity } from './hotels.entity';
import { UsersEntity } from './users.entity';

@Entity('bookings')
@Unique(['hotel', 'room', 'bookingDate'])
export class BookingsEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsersEntity, (user) => user.bookings, { eager: true })
  user: UsersEntity;

  @ManyToOne(() => HotelsEntity, (hotel) => hotel.bookings, {eager: true})
  hotel: HotelsEntity;

  @Column('varchar', { length: 20 })
  room: string;

  @Column('date')
  bookingDate: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}