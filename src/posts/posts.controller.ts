import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { IPost } from './interface/posts.interface';
import { createPostDTO } from '../posts/dto/posts.dto';
import urls from 'src/constants/urls';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller(urls.posts)
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private PostsService: PostsService) {}
  @Get()
  async findAll(): Promise<IPost[]> {
    return this.PostsService.findAll();
  }
  @Get(`:${urls.id}`)
  async findAllByUserId(@Param('id') id: number): Promise<IPost[]> {
    return this.PostsService.findAllByUserId(id);
  }

  @Get(':id/likes')
  async addLike(@Param('id') id: number): Promise<void> {
    await this.PostsService.addLike(id);
  }

  @Post()
  async createPost(@Body() createPostDTO: createPostDTO): Promise<void> {
    return this.PostsService.createPost(createPostDTO);
  }
}
