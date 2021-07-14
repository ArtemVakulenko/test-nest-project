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
import { IComment } from './interface/comments.interface';
import { CommentEntity } from 'src/database/entities/Comment.entity';
import { createCommentDTO } from './dto/comments.dto';

@Controller('comments')
export class CommentsController {
  constructor(private CommentsService: CommentsService) {}

  @Get()
  async findAll(): Promise<IComment[]> {
    return this.CommentsService.findAll();
  }
  @Get(':id/posts')
  async findAllByPostId(@Param('id') postId: number): Promise<IComment[]> {
    return this.CommentsService.findAllByPostId(postId);
  }

  @Get(':id/users')
  async findAllByUserId(@Param('id') userId: number): Promise<IComment[]> {
    return this.CommentsService.findAllByUserId(userId);
  }

  @Post()
  createComment(@Body() createCommentDTO: createCommentDTO): Promise<void> {
    // console.log(createCommentDTO);
    return this.CommentsService.createComment(createCommentDTO);
  }
}
