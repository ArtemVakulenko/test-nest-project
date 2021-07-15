import { Body, Controller, Get, Post, Param } from '@nestjs/common';

import { PostsService } from './posts.service';
import { PostEntity } from '../database/entities/Post.entity';
import { IPost } from './interface/posts.interface';
import { createPostDTO } from '../posts/dto/posts.dto';
import urls from 'src/constants/urls';

@Controller(urls.posts)
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

  @Post()
  async createPost(@Body() createPostDTO: createPostDTO): Promise<void> {
    return this.PostsService.createPost(createPostDTO);
  }
}
