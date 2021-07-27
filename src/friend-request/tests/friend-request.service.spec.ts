import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FriendRequestEntity } from '../../database/entities/FriendRequest.entity';
import { mockFriendRequestRepository } from './mocks/mockFriendRequestRepository';
import { FriendRequestService } from '../friend-request.service';
import { UserEntity } from '../../database/entities/User.entity';
import { mockUsersRepository } from '../../users/tests/mocks/mockUsersRepository';

describe('PostsService', () => {
  let service: FriendRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendRequestService,
        {
          provide: getRepositoryToken(FriendRequestEntity),
          useValue: mockFriendRequestRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<FriendRequestService>(FriendRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find all user-made requests', async () => {
    const result = [
      {
        author: { id: 1 },
        recipient: { id: 2 },
        status: '123',
      },
    ];
    expect(await service.getAllMyReq(1)).toEqual(result);
    expect(mockFriendRequestRepository.find).toHaveBeenCalled();
  });
  it('should find all requests for me', async () => {
    const result = [
      {
        author: { id: 1 },
        recipient: { id: 2 },
        status: '123',
      },
    ];
    expect(await service.getAllReqsForMe(1)).toEqual(result);
    expect(mockFriendRequestRepository.find).toHaveBeenCalled();
  });
  it('should create friend requests', async () => {
    const dto = {
      authorId: 5,
      recipientId: 10,
    };
    expect(await service.createFriendRequest(dto)).toEqual(undefined);
    expect(mockFriendRequestRepository.findOne).toHaveBeenCalledTimes(2);
  });
  it('should accept friend requests', async () => {
    const dto = {
      authorId: 2,
      recipientId: 3,
    };
    expect(await service.acceptFriendRequest(dto)).toEqual(undefined);
    expect(mockFriendRequestRepository.findOne).toHaveBeenCalled();
    expect(mockFriendRequestRepository.update).toHaveBeenCalled();
  });
});
