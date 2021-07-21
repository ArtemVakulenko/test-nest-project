import {
  Res,
  Get,
  Put,
  Body,
  Post,
  Param,
  Delete,
  UseGuards,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
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
import { IFriendRequest } from 'src/friend-request/dto/friend-request.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller(urls.users)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private UsersService: UsersService) {}

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

  @Get(':id/avatars')
  async serveAvatar(@Param('id') id: number, @Res() res): Promise<any> {
    const user = await this.UsersService.findOne(id);
    res.sendFile(user.avatar, { root: 'uploads/avatars' });
  }

  @Get(':id/friends')
  async getMyFriends(@Param('id') id: number): Promise<IFriendRequest[]> {
    return this.UsersService.getMyFriends(id);
  }

  @Get(':id/followers')
  async getMyFollowers(@Param('id') id: number): Promise<IFriendRequest[]> {
    return this.UsersService.getMyFollowers(id);
  }

  @Get(':id/leaders')
  async getMyLeaders(@Param('id') id: number): Promise<IFriendRequest[]> {
    return this.UsersService.getMyLeaders(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201 })
  async create(@Body() postUserDTO: postUserDTO): Promise<void> {
    return this.UsersService.create(postUserDTO);
  }

  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads/avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') id) {
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
