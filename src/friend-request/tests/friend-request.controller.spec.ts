import { Test, TestingModule } from '@nestjs/testing';
import { FriendRequestController } from '../friend-request.controller';
import { mockFriendRequestService } from './mocks/mockFriendRequestService';
import { FriendRequestService } from '../friend-request.service';

describe('UsersController', () => {
  let controller: FriendRequestController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendRequestController],
      providers: [FriendRequestService],
    })
      .overrideProvider(FriendRequestService)
      .useValue(mockFriendRequestService)
      .compile();
    controller = module.get<FriendRequestController>(FriendRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all my requests', async () => {
    const result = [
      {
        author: {},
        recipient: {},
        status: '123',
      },
    ];
    expect(await controller.getAllMyReq(1)).toEqual(result);
    expect(mockFriendRequestService.getAllMyReq).toHaveBeenCalled();
  });
  it('should return all requests for me', async () => {
    const result = [
      {
        author: {},
        recipient: {},
        status: '123',
      },
    ];
    expect(await controller.getAllReqsForMe(1)).toEqual(result);
    expect(mockFriendRequestService.getAllReqsForMe).toHaveBeenCalled();
  });
  it('should accept friend request', async () => {
    const dto = {
      authorId: 1,
      recipientId: 2,
    };
    expect(await controller.acceptFriendRequest(dto)).toEqual(undefined);
    expect(mockFriendRequestService.acceptFriendRequest).toHaveBeenCalled();
  });
  it('should create friend request', async () => {
    const dto = {
      authorId: 1,
      recipientId: 2,
    };
    expect(await controller.createFriendRequest(dto)).toEqual(undefined);
    expect(mockFriendRequestService.createFriendRequest).toHaveBeenCalled();
  });
});
