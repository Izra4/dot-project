import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../providers/jwt-auth.guard';
import { UpdateUsersDto } from './dto/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUsersDto: CreateUsersDto) {
    const user = await this.usersService.create(
      createUsersDto.name,
      createUsersDto.email,
      createUsersDto.password,
    );
    return { id: user.id, username: user.name, email: user.email };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne(req.user.email);
    delete user.password;
    return {
      status: 200,
      data: user,
    };
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req, @Body() updateUsersDto: UpdateUsersDto) {
    const user = await this.usersService.findOne(req.user.email);
    const updatedUser = await this.usersService.update(
      user.id,
      updateUsersDto.name,
      updateUsersDto.email,
      updateUsersDto.password,
    );

    return {
      status: 200,
      data: updatedUser,
    };
  }
}
