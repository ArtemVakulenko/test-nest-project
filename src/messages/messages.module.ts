import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/database/entities/Message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { UserEntity } from 'src/database/entities/User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
