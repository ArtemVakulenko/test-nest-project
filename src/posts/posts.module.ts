import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from '../database/entities/Post.entity';
import { UserEntity } from '../database/entities/User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
