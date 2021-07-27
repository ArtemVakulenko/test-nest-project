import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendRequestEntity } from '../database/entities/FriendRequest.entity';
import { FriendRequestController } from './friend-request.controller';
import { FriendRequestService } from './friend-request.service';
import { UserEntity } from '../database/entities/User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendRequestEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [FriendRequestService],
  controllers: [FriendRequestController],
})
export class FriendRequestModule {}
