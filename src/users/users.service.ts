import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/User.entity';
import { putUserDTO } from './dto/users.dto';
import { IUser } from './interface/users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<IUser[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<IUser> {
    return this.usersRepository.findOne(id);
  }

  findOneByUserName(userName: string): Promise<IUser> {
    return this.usersRepository.findOne({ userName });
  }

  findOneByEmail(email: string): Promise<IUser> {
    return this.usersRepository.findOne({ email });
  }
  async uploadFile(file, id) {
    console.log(file);
    await this.usersRepository.update(id, { avatar: file.filename });
  }

  async create(postUserDTO): Promise<void> {
    const user = await this.usersRepository.create(postUserDTO);
    await this.usersRepository.save(user);
  }

  async createGoogleAccount(postUserDTO): Promise<void> {
    const user = await this.usersRepository.create(postUserDTO);
    await this.usersRepository.save(user);
  }

  async deleteOne(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateOne(putUserDTO: putUserDTO): Promise<void> {
    const { id, userName, password } = putUserDTO;
    await this.usersRepository.update(id, { userName, password });
  }
}
