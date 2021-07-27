import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../database/entities/Post.entity';
import { UserEntity } from '../database/entities/User.entity';
import { CommentEntity } from '../database/entities/Comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([CommentEntity]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
