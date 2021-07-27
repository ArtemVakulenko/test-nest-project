import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { IComment } from './dto/comments.dto';
import { createCommentDTO } from './dto/comments.dto';
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

@ApiTags('Comments controller')
@ApiBearerAuth('JWT')
@Controller(urls.comments)
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private CommentsService: CommentsService) {}

  @Get()
  @ApiOperation({ summary: 'returns all comments' })
  @ApiOkResponse({ type: [IComment] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async findAll(): Promise<IComment[]> {
    return this.CommentsService.findAll();
  }
  @Get(`:${urls.id}/${urls.posts}`)
  @ApiOperation({ summary: 'returns all comments by post id' })
  @ApiOkResponse({ type: [IComment] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async findAllByPostId(@Param('id') postId: number): Promise<IComment[]> {
    return this.CommentsService.findAllByPostId(postId);
  }

  @Get(`:${urls.id}/${urls.users}`)
  @ApiOperation({ summary: 'returns all comments by user id' })
  @ApiOkResponse({ type: [IComment] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async findAllByUserId(@Param('id') userId: number): Promise<IComment[]> {
    return this.CommentsService.findAllByUserId(userId);
  }
  @Get(':id/likes')
  @ApiOperation({ summary: 'increments likes on a comment by id' })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async addLike(@Param('id') id: number): Promise<void> {
    return this.CommentsService.addLike(id);
  }
  @Post()
  @ApiOperation({ summary: 'creates comment' })
  @ApiBody({ type: createCommentDTO })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  createComment(@Body() createCommentDTO: createCommentDTO): Promise<void> {
    return this.CommentsService.createComment(createCommentDTO);
  }
}
