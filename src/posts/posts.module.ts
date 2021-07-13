import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostEntity } from 'src/database/entities/Post.entity';
import { User } from 'src/database/entities/User.entity';
// import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
