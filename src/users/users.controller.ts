import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '../database/entities/User.entity';
import { postUserDTO, putUserDTO } from '../users/dto/users.dto';
// import url from '../constants/urls';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  async findAll(): Promise<User[]> {
    return this.UsersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.UsersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201 })
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
