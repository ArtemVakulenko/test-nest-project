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
  Res,
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

  @Get('avatars/:id')
  async serveAvatar(@Param('id') id, @Res() res): Promise<any> {
    const user = await this.UsersService.findOne(id);
    res.sendFile(user.avatar, { root: 'uploads/avatars' });
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
