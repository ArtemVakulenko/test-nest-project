import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
// import { mockUsersService } from '../../users/tests/mocks/mockUsersService';
import { mockPostsService } from './mocks/mockPostsService';

describe('PostsController', () => {
  let controller: PostsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(mockPostsService)
      .compile();
    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(PostsController).toBeDefined();
  });

  // it('should create a user', async () => {
  //   const dto = {
  //     userName: '123',
  //     email: '123',
  //     password: '123',
  //   };
  //   expect(await usersController.create(dto)).toEqual(undefined);
  //   expect(mockUsersService.create).toHaveBeenCalled();
  // });
  it('should get all posts', async () => {
    const result = [
      {
        id: 123,
        content: '123',
        user: {
          id: 123,
          userName: '123',
          password: '123',
          avatar: '123',
        },
        likes: 123,
      },
    ];
    expect(await controller.findAll()).toEqual(result);
    expect(mockPostsService.findAll).toHaveBeenCalled();
  });
  it('should get all by userId', async () => {
    const result = [
      {
        id: 123,
        content: '123',
        user: {
          id: 123,
          userName: '123',
          password: '123',
          avatar: '123',
        },
        likes: 123,
      },
    ];
    expect(await controller.findAllByUserId(123)).toEqual(result);
    expect(mockPostsService.findAllByUserId).toHaveBeenCalled();
  });
  it('should add likes', async () => {
    expect(await controller.addLike(1)).toEqual(undefined);
    expect(mockPostsService.addLike).toHaveBeenCalled();
  });
  it('should create post', async () => {
    const dto = {
      userId: 123,
      content: '123',
    };
    expect(await controller.createPost(dto)).toEqual(undefined);
    expect(mockPostsService.createPost).toHaveBeenCalled();
  });
  // it('should get followers for user', async () => {
  //   const result = [
  //     { id: 123, userName: '123', password: '123', avatar: '123' },
  //   ];
  //   expect(await usersController.getMyFollowers(1)).toEqual(result);
  //   expect(mockUsersService.getMyFollowers).toHaveBeenCalled();
  // });
  // it('should get leaders for user', async () => {
  //   const result = [
  //     { id: 123, userName: '123', password: '123', avatar: '123' },
  //   ];
  //   expect(await usersController.getMyLeaders(1)).toEqual(result);
  //   expect(mockUsersService.getMyLeaders).toHaveBeenCalled();
  // });
  // it('should delete user', async () => {
  //   expect(await usersController.delete(1)).toEqual(undefined);
  //   expect(mockUsersService.getMyLeaders).toHaveBeenCalled();
  // });
  // it('should update user', async () => {
  //   const dto = { id: 123, userName: '123', password: '123', avatar: '123' };
  //   expect(await usersController.put(dto)).toEqual(undefined);
  //   expect(mockUsersService.getMyLeaders).toHaveBeenCalled();
  // });
});
