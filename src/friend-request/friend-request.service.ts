import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequestEntity } from 'src/database/entities/FriendRequest.entity';
import { UserEntity } from 'src/database/entities/User.entity';
import { Repository } from 'typeorm';
import {
  IFriendRequest,
  createFriendRequestDTO,
  acceptFriendRequestDTO,
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
    const sameRequest = await this.friendRequestRepository.findOne({
      author: { id: authorId },
      recipient: { id: recipientId },
    });

    const reversedRequest = await this.friendRequestRepository.findOne({
      author: { id: recipientId },
      recipient: { id: authorId },
    });
    if (sameRequest || reversedRequest || authorId === recipientId) return;

    const friendRequest1 = await this.friendRequestRepository.create({
      status: 'is a follower',
    });
    const friendRequest2 = await this.friendRequestRepository.create({
      status: 'is a leader',
    });
    const author = await this.usersRepository.findOne({ id: authorId });
    const recipient = await this.usersRepository.findOne({ id: recipientId });
    friendRequest1.author = author;
    friendRequest1.recipient = recipient;
    friendRequest2.author = recipient;
    friendRequest2.recipient = author;
    await this.friendRequestRepository.save(friendRequest1);
    await this.friendRequestRepository.save(friendRequest2);
  }

  async acceptFriendRequest(body: acceptFriendRequestDTO): Promise<void> {
    const { authorId } = body;
    await this.friendRequestRepository.update(
      { author: { id: authorId } },
      { status: 'friends' },
    );
    await this.friendRequestRepository.update(
      { recipient: { id: authorId } },
      { status: 'friends' },
    );
  }
}
