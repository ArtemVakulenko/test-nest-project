import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { MessagesModule } from './messages/messages.module';
import { FriendRequestModule } from './friend-request/friend-request.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    PostsModule,
    CommentsModule,
    AuthModule,
    MessagesModule,
    FriendRequestModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
