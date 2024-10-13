import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BookingsEntity } from './bookings.entity';

@Entity('hotels')
export class HotelsEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => BookingsEntity, (booking) => booking.hotel)
  bookings: BookingsEntity[]
}
