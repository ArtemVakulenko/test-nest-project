import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from '../comments.controller';
import { mockCommentsService } from './mocks/mockCommentsService';
import { CommentsService } from '../comments.service';

describe('UsersController', () => {
  let controller: CommentsController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService],
    })
      .overrideProvider(CommentsService)
      .useValue(mockCommentsService)
      .compile();
    controller = module.get<CommentsController>(CommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all comments', async () => {
    const result = [
      {
        id: 123,
        content: '123',
        user: {},
        post: {},
        likes: 123,
      },
    ];
    expect(await controller.findAll()).toEqual(result);
    expect(mockCommentsService.findAll).toHaveBeenCalled();
  });

  it('should return all comments by userId', async () => {
    const result = [
      {
        id: 123,
        content: '123',
        user: {},
        post: {},
        likes: 123,
      },
    ];
    expect(await controller.findAllByUserId(123)).toEqual(result);
    expect(mockCommentsService.findAllByUserId).toHaveBeenCalled();
  });

  it('should return all comments by postId', async () => {
    const result = [
      {
        id: 123,
        content: '123',
        user: {},
        post: {},
        likes: 123,
      },
    ];
    expect(await controller.findAllByPostId(123)).toEqual(result);
    expect(mockCommentsService.findAllByPostId).toHaveBeenCalled();
  });

  it('should add like on a comment', async () => {
    expect(await controller.addLike(123)).toEqual(undefined);
    expect(mockCommentsService.addLike).toHaveBeenCalled();
  });

  it('should create a comment', async () => {
    const dto = {
      content: '123',
      userId: 123,
      postId: 123,
    };
    expect(await controller.createComment(dto)).toEqual(undefined);
    expect(mockCommentsService.createComment).toHaveBeenCalled();
  });
});
