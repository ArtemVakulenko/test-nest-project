import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from '../database/entities/User.entity';
import { IUser } from './interface/users.interface';
import { postUserDTO, putUserDTO } from '../users/dto/users.dto';
import urls from '../constants/urls';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('users')
@Controller(urls.users)
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  async findAll(): Promise<IUser[]> {
    return this.UsersService.findAll();
  }

  @Get(`:${urls.id}`)
  async findOne(@Param(`${urls.id}`) id: number): Promise<IUser> {
    return this.UsersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201 })
  async create(@Body() postUserDTO: postUserDTO): Promise<void> {
    return this.UsersService.create(postUserDTO);
  }

  // @UseGuards(AuthGuard('local'))
  // @Post('/login')
  // async login(@Body() postUserDTO: postUserDTO): Promise<void> {
  //   const user = await this.UsersService.findOnByUserName(postUserDTO.userName);
  //   return await this.AuthService.validateUser(user.userName, user.password);
  // }

  @Delete(`:${urls.id}`)
  async delete(@Param(`${urls.id}`) userId: number): Promise<void> {
    return this.UsersService.deleteOne(userId);
  }

  @Put()
  async put(@Body() putUserDTO: putUserDTO): Promise<void> {
    return this.UsersService.updateOne(putUserDTO);
  }
}
