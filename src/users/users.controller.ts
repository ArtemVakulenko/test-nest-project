import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserEntity } from '../database/entities/User.entity';
import { IUser } from './interface/users.interface';
import { postUserDTO, putUserDTO } from '../users/dto/users.dto';
import urls from '../constants/urls';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
// import { Public } from 'src/helpers.ts/customDecorators';

@ApiBearerAuth()
@ApiTags('users')
@Controller(urls.users)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private UsersService: UsersService) {}

  // @Public()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserEntity,
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

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file', { dest: 'uploads/avatars' }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') id) {
    // console.log(file);
    return this.UsersService.uploadFile(file, id);
  }

  @Delete(`:${urls.id}`)
  async delete(@Param(`${urls.id}`) userId: number): Promise<void> {
    return this.UsersService.deleteOne(userId);
  }

  @Put()
  async put(@Body() putUserDTO: putUserDTO): Promise<void> {
    return this.UsersService.updateOne(putUserDTO);
  }
}
