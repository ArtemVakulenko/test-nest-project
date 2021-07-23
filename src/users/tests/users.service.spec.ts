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
});
