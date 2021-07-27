import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FriendRequestEntity } from '../../database/entities/FriendRequest.entity';
import { UserEntity } from '../../database/entities/User.entity';
import { UsersService } from '../users.service';
import { mockUsersRepository } from './mocks/mockUsersRepository';
import { mockFriendRequestRepository } from './mocks/mockFriendRequestRepository';
import {
  mockCreateUserDto,
  mockIUserArray,
  mockIUser,
  mockPutUserDto,
} from './mocks/mocks';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(FriendRequestEntity),
          useValue: mockFriendRequestRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find all users', () => {
    expect(service.findAll()).toEqual(mockIUserArray);
  });
  it('should find one by id user', () => {
    expect(service.findOne(123)).toEqual(mockIUser);
  });
  it('should find one by user name', () => {
    expect(service.findOneByUserName('123')).toEqual(mockIUser);
  });
  it('should return users friends', async () => {
    expect(await service.getMyFriends(1)).toEqual(undefined);
  });
  it('should return users followers', async () => {
    expect(await service.getMyFollowers(1)).toEqual(undefined);
  });
  it('should return users leaders', async () => {
    expect(await service.getMyLeaders(1)).toEqual(undefined);
  });
  it('should find one by email', async () => {
    expect(await service.findOneByEmail('123')).toEqual(mockIUser);
  });
  it('should create account', async () => {
    expect(await service.create(mockCreateUserDto)).toEqual(undefined);
  });
  it('should create provider account', async () => {
    expect(await service.create(mockCreateUserDto)).toEqual(undefined);
  });
  it('should create google account', async () => {
    expect(await service.createGoogleAccount(mockCreateUserDto)).toEqual(
      undefined,
    );
  });
  it('should delete account', async () => {
    expect(await service.deleteOne(1)).toEqual(undefined);
  });
  it('should update google account', async () => {
    expect(await service.updateOne(mockPutUserDto)).toEqual(undefined);
  });
});
