import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../database/entities/User.entity';
import { postUserDTO, putUserDTO } from '../users/dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.UsersService.findOne(id);
  }

  @Post()
  async create(@Body() postUserDTO: postUserDTO): Promise<void> {
    return this.UsersService.create(postUserDTO);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.UsersService.deleteOne(id);
  }

  @Put()
  async put(@Body() putUserDTO: putUserDTO): Promise<void> {
    return this.UsersService.updateOne(putUserDTO);
  }
}
