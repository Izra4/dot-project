import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Post('register')
  async register(@Body() createUsersDto: CreateUsersDto) {
    const user = await this.usersService.create(createUsersDto.name, createUsersDto.email,createUsersDto.password);
    return { id: user.id, username: user.name, email: user.email };
  }
}