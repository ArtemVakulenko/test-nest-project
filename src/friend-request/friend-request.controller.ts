import { Controller, Get, UseGuards, Param, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FriendRequestService } from './friend-request.service';
import unAuthResponse from '../constants/unauthorized';
import {
  IFriendRequest,
  createFriendRequestDTO,
  acceptFriendRequestDTO,
} from './dto/friend-request.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Friend requests controller')
@ApiBearerAuth('JWT')
@Controller('friend-request')
@UseGuards(JwtAuthGuard)
export class FriendRequestController {
  constructor(private friendRequestService: FriendRequestService) {}

  @Get(':id/author')
  @ApiOperation({ summary: 'gets friend requests made by user' })
  @ApiOkResponse({ type: [IFriendRequest] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async getAllMyReq(@Param('id') id: number): Promise<IFriendRequest[]> {
    return this.friendRequestService.getAllMyReq(id);
  }

  @Get(':id/recipient')
  @ApiOperation({ summary: 'gets friend requests for user' })
  @ApiOkResponse({ type: [IFriendRequest] })
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async getAllReqsForMe(@Param('id') id: number): Promise<IFriendRequest[]> {
    return this.friendRequestService.getAllReqsForMe(id);
  }

  @Post('/accept')
  @ApiOperation({ summary: 'accepts friend request made by user' })
  @ApiBody({ type: acceptFriendRequestDTO })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async acceptFriendRequest(
    @Body() acceptFriendRequestDTO: acceptFriendRequestDTO,
  ): Promise<void> {
    return this.friendRequestService.acceptFriendRequest(
      acceptFriendRequestDTO,
    );
  }

  @Post()
  @ApiOperation({ summary: 'creates friend requests made by user' })
  @ApiBody({ type: createFriendRequestDTO })
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse({ type: unAuthResponse })
  async createFriendRequest(
    @Body() createFriendRequestDTO: createFriendRequestDTO,
  ): Promise<void> {
    return this.friendRequestService.createFriendRequest(
      createFriendRequestDTO,
    );
  }
}
