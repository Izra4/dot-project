import {
  Column,
  CreateDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingsEntity } from './bookings.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => BookingsEntity, (booking) => booking.user)
  bookings: BookingsEntity[];
}
