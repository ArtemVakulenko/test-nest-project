import { Controller, Get, UseGuards, Param, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FriendRequestService } from './friend-request.service';
import {
  IFriendRequest,
  createFriendRequestDTO,
  acceptFriendRequestDTO,
} from './dto/friend-request.dto';

@Controller('friend-request')
@UseGuards(JwtAuthGuard)
export class FriendRequestController {
  constructor(private friendRequestService: FriendRequestService) {}

  @Get(':id/author')
  async getAllMyReq(@Param('id') id: number): Promise<IFriendRequest[]> {
    return this.friendRequestService.getAllMyReq(id);
  }

  @Get(':id/recipient')
  async getAllReqsForMe(@Param('id') id: number): Promise<IFriendRequest[]> {
    return this.friendRequestService.getAllReqsForMe(id);
  }

  @Post('/accept')
  async acceptFriendRequest(
    @Body() acceptFriendRequestDTO: acceptFriendRequestDTO,
  ): Promise<void> {
    return this.friendRequestService.acceptFriendRequest(
      acceptFriendRequestDTO,
    );
  }

  @Post()
  async createFriendRequest(
    @Body() createFriendRequestDTO: createFriendRequestDTO,
  ): Promise<void> {
    return this.friendRequestService.createFriendRequest(
      createFriendRequestDTO,
    );
  }
}
