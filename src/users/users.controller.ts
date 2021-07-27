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
  ApiBody,
  ApiParam,
  ApiConsumes,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiProduces,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { IUser } from './interface/users.interface';
import { postUserDTO, putUserDTO } from '../users/dto/users.dto';
import urls from '../constants/urls';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { IFriendRequest } from '../friend-request/dto/friend-request.dto';
import unAuthResponse from '../constants/unauthorized';

@ApiTags('Users controller')
@ApiBearerAuth('JWT')
@Controller(urls.users)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'gets all users' })
  @ApiOkResponse({ type: [IUser] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async findAll(): Promise<IUser[]> {
    return this.UsersService.findAll();
  }

  @Get(`:${urls.id}`)
  @ApiOperation({ summary: 'get one user by id' })
  @ApiOkResponse({ type: IUser })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async findOne(@Param(`${urls.id}`) id: number): Promise<IUser> {
    return this.UsersService.findOne(id);
  }

  @Get(':id/avatars')
  @ApiOperation({ summary: 'get avatars by user id' })
  @ApiProduces('multipart/form-data')
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async serveAvatar(@Param('id') id: number, @Res() res): Promise<any> {
    const user = await this.UsersService.findOne(id);
    res.sendFile(user.avatar, { root: 'uploads/avatars' });
  }

  @Get(':id/friends')
  @ApiOperation({ summary: 'get friends by user id' })
  @ApiOkResponse({ type: [IUser] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async getMyFriends(@Param('id') id: number): Promise<IFriendRequest[]> {
    return this.UsersService.getMyFriends(id);
  }

  @Get(':id/followers')
  @ApiOperation({ summary: 'get followers by user id' })
  @ApiOkResponse({ type: [IUser] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async getMyFollowers(@Param('id') id: number): Promise<IFriendRequest[]> {
    return this.UsersService.getMyFollowers(id);
  }

  @Get(':id/leaders')
  @ApiOperation({ summary: 'get who user follows by user id' })
  @ApiOkResponse({ type: [IUser] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async getMyLeaders(@Param('id') id: number): Promise<IFriendRequest[]> {
    return this.UsersService.getMyLeaders(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async create(@Body() postUserDTO: postUserDTO): Promise<void> {
    return this.UsersService.create(postUserDTO);
  }

  @Post(':id/upload')
  @ApiOperation({ summary: 'uploads user avatar' })
  @ApiCreatedResponse()
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
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
  @ApiOperation({ summary: 'deletes user by id' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async delete(@Param(`${urls.id}`) userId: number): Promise<void> {
    return this.UsersService.deleteOne(userId);
  }

  @Put()
  @ApiOperation({ summary: 'changes user by id in body' })
  @ApiBody({ type: putUserDTO })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async put(@Body() putUserDTO: putUserDTO): Promise<void> {
    return this.UsersService.updateOne(putUserDTO);
  }
}
