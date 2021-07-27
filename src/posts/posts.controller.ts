import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { IPost } from './dto/posts.dto';
import { createPostDTO } from '../posts/dto/posts.dto';
import urls from '../constants/urls';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import unAuthResponse from '../constants/unauthorized';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Posts controller')
@ApiBearerAuth('JWT')
@Controller(urls.posts)
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private PostsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: 'get all posts' })
  @ApiOkResponse({ type: [IPost] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async findAll(): Promise<IPost[]> {
    return this.PostsService.findAll();
  }

  @Get(`:${urls.id}`)
  @ApiOperation({ summary: 'get all posts by user id' })
  @ApiOkResponse({ type: [IPost] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async findAllByUserId(@Param('id') id: number): Promise<IPost[]> {
    return this.PostsService.findAllByUserId(id);
  }

  @Get(':id/likes')
  @ApiOperation({ summary: 'add like on a posts with matching id' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async addLike(@Param('id') id: number): Promise<void> {
    await this.PostsService.addLike(id);
  }

  @Post()
  @ApiOperation({ summary: 'creates a post' })
  @ApiBody({ type: createPostDTO })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async createPost(@Body() createPostDTO: createPostDTO): Promise<void> {
    return this.PostsService.createPost(createPostDTO);
  }
}
