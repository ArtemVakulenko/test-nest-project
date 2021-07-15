import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { IComment } from './interface/comments.interface';
import { CommentEntity } from 'src/database/entities/Comment.entity';
import { createCommentDTO } from './dto/comments.dto';
import urls from '../constants/urls';

@Controller(urls.comments)
export class CommentsController {
  constructor(private CommentsService: CommentsService) {}

  @Get()
  async findAll(): Promise<IComment[]> {
    return this.CommentsService.findAll();
  }
  @Get(`:${urls.id}/${urls.posts}`)
  async findAllByPostId(@Param('id') postId: number): Promise<IComment[]> {
    return this.CommentsService.findAllByPostId(postId);
  }

  @Get(`:${urls.id}/${urls.users}`)
  async findAllByUserId(@Param('id') userId: number): Promise<IComment[]> {
    return this.CommentsService.findAllByUserId(userId);
  }

  @Post()
  createComment(@Body() createCommentDTO: createCommentDTO): Promise<void> {
    return this.CommentsService.createComment(createCommentDTO);
  }
}
