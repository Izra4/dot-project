import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsEntity } from '../../models/hotels.entity';
import { CreateHotelsDto } from './dto/create-hotels.dto';
import { UpdateHotelsDto } from './dto/update-hotels.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get()
  async findAll(): Promise<HotelsEntity[]> {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<HotelsEntity> {
    const hotel = await this.hotelsService.findOne(id);
    if (!hotel) {
      throw new NotFoundException(`hotel with id ${id} not found`);
    }

    return hotel;
  }

  @Post('create')
  async create(@Body() hotelsDto: CreateHotelsDto): Promise<HotelsEntity> {
    return this.hotelsService.create(hotelsDto.name, hotelsDto.address);
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateHotelsDto: UpdateHotelsDto,
  ): Promise<HotelsEntity> {
    return this.hotelsService.update(
      id,
      updateHotelsDto.name,
      updateHotelsDto.address,
    );
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.hotelsService.remove(id);
  }
}
