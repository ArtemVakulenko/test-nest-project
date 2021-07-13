import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
// import { IComment } from './interface/comments.interface';
import { CommentEntity } from 'src/database/entities/Comment.entity';
@Controller('comments')
export class CommentsController {
  constructor(private CommentsService: CommentsService) {}

  @Get()
  async findAll(): Promise<CommentEntity[]> {
    return this.CommentsService.findAll();
  }
  @Get('postId')
  async findAllByPostId(@Param('id') id: number): Promise<CommentEntity[]> {
    return this.CommentsService.findAllByPostId(id);
  }
}
