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
  it('should find all comments', async () => {
    const result = [
      {
        id: 123,
        content: '123',
        user: {},
        post: {},
        likes: 123,
      },
    ];
    expect(await service.findAll()).toEqual(result);
    expect(mockCommentsRepository.find).toHaveBeenCalled();
  });
  it('should find all comments by postId', async () => {
    const result = [
      {
        id: 123,
        content: '123',
        user: {},
        post: {},
        likes: 123,
      },
    ];
    expect(await service.findAllByPostId(123)).toEqual(result);
    expect(mockCommentsRepository.find).toHaveBeenCalled();
  });
  it('should find all comments by userId', async () => {
    const result = [
      {
        id: 123,
        content: '123',
        user: {},
        post: {},
        likes: 123,
      },
    ];
    expect(await service.findAllByUserId(123)).toEqual(result);
    expect(mockCommentsRepository.find).toHaveBeenCalled();
  });
  it('should add like to a comment', async () => {
    expect(await service.addLike(123)).toEqual(undefined);
    expect(mockCommentsRepository.increment).toHaveBeenCalled();
  });
  it('should create a comment', async () => {
    const dto = {
      content: '123',
      userId: 123,
      postId: 123,
    }
    expect(await service.createComment(dto)).toEqual(undefined);
    expect(mockCommentsRepository.create).toHaveBeenCalled();
  });
});
