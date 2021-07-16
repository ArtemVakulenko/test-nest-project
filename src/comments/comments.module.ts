import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/database/entities/Post.entity';
import { UserEntity } from 'src/database/entities/User.entity';
import { CommentEntity } from 'src/database/entities/Comment.entity';

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
