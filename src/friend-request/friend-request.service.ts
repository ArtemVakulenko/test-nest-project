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
    const reqs = await this.friendRequestRepository.find({
      relations: ['authorId', 'recipientId'],
      // where: { authorId: { authorId.id: id } },
    });
    console.log(reqs[0].authorId[0].id, typeof reqs[0].authorId[0].id);
    console.log(id, typeof id);
    // reqs.filter((el) => {
    //   el.authorId[0].id === +id;
    // });
    return reqs;
  }

  async getAllReqsForMe(id: number): Promise<IFriendRequest[]> {
    const reqs = await this.friendRequestRepository.find({
      relations: ['authorId', 'recipientId'],
    });
    // console.log(reqs[0].recipientId[0].id);
    // console.log(typeof +id);
    reqs.filter((el) => {
      el.recipientId[0].id === +id;
    });
    return reqs;
  }

  async createFriendRequest(body: createFriendRequestDTO): Promise<void> {
    const { authorId, recipientId } = body;
    const friendRequest = await this.friendRequestRepository.create({
      status: false,
    });
    const author = await this.usersRepository.findOne({ id: authorId });
    const recipient = await this.usersRepository.findOne({ id: recipientId });
    friendRequest.authorId = [author];
    friendRequest.recipientId = [recipient];
    console.log(friendRequest);
    await this.friendRequestRepository.save(friendRequest);
  }
}
