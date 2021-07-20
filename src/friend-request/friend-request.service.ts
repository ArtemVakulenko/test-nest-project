import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequestEntity } from 'src/database/entities/FriendRequest.entity';
import { UserEntity } from 'src/database/entities/User.entity';
import { Repository } from 'typeorm';
import {
  IFriendRequest,
  createFriendRequestDTO,
} from './dto/friend-request.dto';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequestEntity)
    private friendRequestRepository: Repository<FriendRequestEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getAllMyReq(id: number): Promise<IFriendRequest[]> {
    return await this.friendRequestRepository.find({
      relations: ['author', 'recipient'],
      where: { author: { id } },
    });
  }

  async getAllReqsForMe(id: number): Promise<IFriendRequest[]> {
    return await this.friendRequestRepository.find({
      relations: ['author', 'recipient'],
      where: { recipient: { id } },
    });
  }

  async createFriendRequest(body: createFriendRequestDTO): Promise<void> {
    const { authorId, recipientId } = body;
    const friendRequest = await this.friendRequestRepository.create({
      status: 'following',
    });
    const author = await this.usersRepository.findOne({ id: authorId });
    const recipient = await this.usersRepository.findOne({ id: recipientId });
    friendRequest.author = author;
    friendRequest.recipient = recipient;
    await this.friendRequestRepository.save(friendRequest);
  }

  async acceptFriendRequest(id: number): Promise<void> {
    await this.friendRequestRepository.update(id, {
      status: 'friends',
    });
  }
}
