import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelsEntity } from '../../models/hotels.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(HotelsEntity)
    private readonly hotelsRepository: Repository<HotelsEntity>,
  ) {}

  async create(name: string, address: string): Promise<HotelsEntity> {
    const hotel = this.hotelsRepository.create({ name, address });
    return this.hotelsRepository.save(hotel);
  }

  async findAll(): Promise<HotelsEntity[]> {
    return this.hotelsRepository.find();
  }

  async findOne(id: number): Promise<HotelsEntity | undefined> {
    return this.hotelsRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    name: string,
    address: string,
  ): Promise<HotelsEntity | undefined> {
    const hotel = await this.hotelsRepository.findOne({ where: { id } });

    if (hotel) {
      hotel.name = name && name.trim() !== '' ? name : hotel.name;
      hotel.address = address && address.trim() !== '' ? address : hotel.address;
      return this.hotelsRepository.save(hotel);
    }

    return undefined;
  }

  async remove(id: number): Promise<void> {
    await this.hotelsRepository.delete(id);
  }
}
