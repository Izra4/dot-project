import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../models/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(
    name: string,
    email: string,
    password: string,
  ): Promise<UsersEntity> {
    const hashedPass = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      name: name,
      email: email,
      password: hashedPass,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }
  async findOne(email: string): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, name: string, email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (user) {

      user.name = name && name.trim() !== "" ? name : user.name;
      user.email = email && email.trim() !== "" ? email : user.email;

      if (password && password.trim() !== "") {
        user.password = await bcrypt.hash(password, 10);
      }

      return this.usersRepository.save(user);
    }
    return {
      status: 400,
      message: 'update failed',
    };
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
