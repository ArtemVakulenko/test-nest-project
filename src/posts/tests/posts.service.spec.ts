import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostEntity } from '../../database/entities/Post.entity';
import { mockUsersRepository } from '../../users/tests/mocks/mockUsersRepository';
import { PostsService } from '../posts.service';
import { mockPostsRepository } from '../tests/mocks/mockPostsRepository';
import { UserEntity } from '../../database/entities/User.entity';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(PostEntity),
          useValue: mockPostsRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find all posts', async () => {
    const result = [
      {
        id: 123,
        content: '123',
        user: {},
        likes: 123,
      },
    ];
    expect(await service.findAll()).toEqual(result);
    expect(mockPostsRepository.find).toHaveBeenCalled();
  });
  it('should find all post by userId', async () => {
    const result = [
      {
        id: 123,
        content: '123',
        user: {},
        likes: 123,
      },
    ];
    expect(await service.findAllByUserId(123)).toEqual(result);
    expect(mockPostsRepository.find).toHaveBeenCalled();
  });
  it('should add like by postId', async () => {
    expect(await service.addLike(123)).toEqual(undefined);
    expect(mockPostsRepository.increment).toHaveBeenCalled();
  });
  it('should create post ', async () => {
    const dto = {
      content: '123',
      userId: 1,
    };
    expect(await service.createPost(dto)).toEqual(undefined);
    expect(mockPostsRepository.create).toHaveBeenCalled();
    expect(mockPostsRepository.save).toHaveBeenCalled();
  });
});
