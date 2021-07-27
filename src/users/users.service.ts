import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/entities/User.entity';
import { postUserDTO, putUserDTO } from './dto/users.dto';
import { IUser } from './interface/users.interface';
import { createHash } from 'crypto';
import { FriendRequestEntity } from '../database/entities/FriendRequest.entity';
import { IFriendRequest } from '../friend-request/dto/friend-request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    @InjectRepository(FriendRequestEntity)
    private friendRequestRepository: Repository<FriendRequestEntity>,
  ) {}

  findAll(): Promise<IUser[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<IUser> {
    return this.usersRepository.findOne(id);
  }

  findOneByUserName(userName: string): Promise<IUser> {
    return this.usersRepository.findOne({ userName });
  }

  async getMyFriends(id: number): Promise<any> {
    return await this.friendRequestRepository.query(
      `SELECT "recipientId", "userName", "email", "avatar", "status" FROM friend_request_entity
    RIGHT JOIN user_entity ON user_entity.id = "recipientId"
    WHERE "authorId"=${id} AND status='friends'
    GROUP BY "recipientId", "userName", "email", "avatar", "status"`,
    );
  }

  async getMyFollowers(id: number): Promise<IFriendRequest[]> {
    return await this.friendRequestRepository.query(
      `SELECT "recipientId", "userName", "email", "avatar", "status" FROM friend_request_entity
    RIGHT JOIN user_entity ON user_entity.id = "recipientId"
    WHERE "authorId"=${id} AND status='is a follower'
    GROUP BY "recipientId", "userName", "email", "avatar", "status"`,
    );
  }

  async getMyLeaders(id: number): Promise<IFriendRequest[]> {
    return await this.friendRequestRepository.query(
      `SELECT "recipientId", "userName", "email", "avatar", "status" FROM friend_request_entity
    RIGHT JOIN user_entity ON user_entity.id = "recipientId"
    WHERE "authorId"=${id} AND status='is a leader'
    GROUP BY "recipientId", "userName", "email", "avatar", "status"`,
    );
  }

  findOneByEmail(email: string): Promise<IUser> {
    return this.usersRepository.findOne({ email });
  }

  async uploadFile(file, id: number) {
    await this.usersRepository.update(id, { avatar: file.filename });
  }

  async create(postUserDTO: postUserDTO): Promise<void> {
    if (postUserDTO.password) {
      const hash = createHash('sha256');
      hash.update(postUserDTO.password);
      const hashedPass = hash.digest('hex');
      const { userName, email } = postUserDTO;
      const userToCreate = { userName, password: hashedPass, email };
      const user = await this.usersRepository.create(userToCreate);
      await this.usersRepository.save(user);
    } else {
      const userFromProvider = await this.usersRepository.create(postUserDTO);
      await this.usersRepository.save(userFromProvider);
    }
  }

  async createGoogleAccount(postUserDTO: postUserDTO): Promise<void> {
    const user = await this.usersRepository.create(postUserDTO);
    await this.usersRepository.save(user);
  }

  async deleteOne(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateOne(putUserDTO: putUserDTO): Promise<void> {
    const { id, userName, password } = putUserDTO;
    await this.usersRepository.update(id, { userName, password });
  }
}
