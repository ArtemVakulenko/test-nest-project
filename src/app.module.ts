import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { CatsModule } from './cats/cats.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [UsersModule, DatabaseModule, CatsModule, PostsModule, CommentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
