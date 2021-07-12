import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/entities/User.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async create(postUserDTO): Promise<void> {
    const user = await this.usersRepository.create(postUserDTO);
    await this.usersRepository.save(user);
  }

  async deleteOne(id): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateOne(putUserDTO): Promise<void> {
    const { id, userName, password } = putUserDTO;
    await this.usersRepository.update(id, { userName, password });
  }
}
