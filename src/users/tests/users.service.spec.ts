import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FriendRequestEntity } from '../../database/entities/FriendRequest.entity';
import { UserEntity } from '../../database/entities/User.entity';
import { UsersService } from '../users.service';
import { mockUsersRepository } from './mocks/mockUsersRepository';
import { mockFriendRequestRepository } from './mocks/mockFriendRequestRepository';

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
    const result = [
      {
        id: 123,
        userName: '123',
        password: '123',
        avatar: '123',
      },
    ];
    expect(service.findAll()).toEqual(result);
  });
  it('should find one by id user', () => {
    const result = {
      id: 123,
      userName: '123',
      password: '123',
      avatar: '123',
    };
    expect(service.findOne(123)).toEqual(result);
  });
  it('should find one by user name', () => {
    const result = {
      id: 123,
      userName: '123',
      password: '123',
      avatar: '123',
    };
    expect(service.findOneByUserName('123')).toEqual(result);
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
    const result = {
      id: 123,
      userName: '123',
      password: '123',
      avatar: '123',
    };
    expect(await service.findOneByEmail('123')).toEqual(result);
  });
  it('should create account', async () => {
    const dto = {
      userName: '123',
      password: '123',
      email: '123',
    };
    expect(await service.create(dto)).toEqual(undefined);
  });
  it('should provider account', async () => {
    const dto = {
      userName: '123',
      email: '123',
    };
    expect(await service.create(dto)).toEqual(undefined);
  });
  it('should create google account', async () => {
    const dto = {
      userName: '123',
      password: '123',
      email: '123',
    };
    expect(await service.createGoogleAccount(dto)).toEqual(undefined);
  });
  it('should delete account', async () => {
    expect(await service.deleteOne(1)).toEqual(undefined);
  });
  it('should update google account', async () => {
    const dto = {
      id: 123,
      userName: '123',
      password: '123',
      email: '123',
    };
    expect(await service.updateOne(dto)).toEqual(undefined);
  });
});
