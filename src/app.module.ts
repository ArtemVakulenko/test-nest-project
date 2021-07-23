import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { MessagesModule } from './messages/messages.module';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { ShrekController } from './shrek/shrek.controller';
import { ShrekService } from './shrek/shrek.service';

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
  controllers: [AppController, ShrekController],
  providers: [ShrekService],
})
export class AppModule {}
