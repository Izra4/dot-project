import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../models/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService{

  constructor(@InjectRepository(UsersEntity) private usersRepository: Repository<UsersEntity>) {

  }

  async create(name: string, email: string, password: string): Promise<UsersEntity> {
    const hashedPass = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      name: name,
      email: email,
      password: hashedPass
    });
    return this.usersRepository.save(user)
  }
}