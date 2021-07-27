import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/User.entity';
import { mockUsersRepository } from '../../users/tests/mocks/mockUsersRepository';
import { CommentEntity } from '../../database/entities/Comment.entity';
import { mockCommentsRepository } from './mocks/mockCommentsRepository';
import { PostEntity } from '../../database/entities/Post.entity';
import { mockPostsRepository } from '../../posts/tests/mocks/mockPostsRepository';
import { CommentsService } from '../comments.service';

describe('PostsService', () => {
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(CommentEntity),
          useValue: mockCommentsRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository,
        },
        {
          provide: getRepositoryToken(PostEntity),
          useValue: mockPostsRepository,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // it('should find all user-made requests', async () => {
  //   const result = [
  //     {
  //       author: { id: 1 },
  //       recipient: { id: 2 },
  //       status: '123',
  //     },
  //   ];
  //   expect(await service.getAllMyReq(1)).toEqual(result);
  //   expect(mockFriendRequestRepository.find).toHaveBeenCalled();
  // });
  // it('should find all requests for me', async () => {
  //   const result = [
  //     {
  //       author: { id: 1 },
  //       recipient: { id: 2 },
  //       status: '123',
  //     },
  //   ];
  //   expect(await service.getAllReqsForMe(1)).toEqual(result);
  //   expect(mockFriendRequestRepository.find).toHaveBeenCalled();
  // });
  // it('should create friend requests', async () => {
  //   const dto = {
  //     authorId: 5,
  //     recipientId: 10,
  //   };
  //   expect(await service.createFriendRequest(dto)).toEqual(undefined);
  //   expect(mockFriendRequestRepository.findOne).toHaveBeenCalledTimes(2);
  // });
  // it('should accept friend requests', async () => {
  //   const dto = {
  //     authorId: 2,
  //     recipientId: 3,
  //   };
  //   expect(await service.acceptFriendRequest(dto)).toEqual(undefined);
  //   expect(mockFriendRequestRepository.findOne).toHaveBeenCalled();
  //   expect(mockFriendRequestRepository.update).toHaveBeenCalled();
  // });
});
