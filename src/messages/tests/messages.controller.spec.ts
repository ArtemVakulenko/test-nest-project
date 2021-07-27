import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from '../messages.controller';
import { MessagesService } from '../messages.service';
import { mockMessagesService } from './mocks/mockMessagesService';

describe('PostsController', () => {
  let controller: MessagesController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [MessagesService],
    })
      .overrideProvider(MessagesService)
      .useValue(mockMessagesService)
      .compile();
    controller = module.get<MessagesController>(MessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should get all messages', async () => {
    const result = [
      {
        author: {},
        recipient: {},
        content: '123',
      },
    ];
    expect(await controller.getAllMessages()).toEqual(result);
    expect(mockMessagesService.getAllMessages).toHaveBeenCalled();
  });
  it('should get all my messages', async () => {
    const result = [
      {
        author: {},
        recipient: {},
        content: '123',
      },
    ];
    expect(await controller.getMyMessages(1)).toEqual(result);
    expect(mockMessagesService.getMyMessages).toHaveBeenCalled();
  });
  it('should get all messages for me', async () => {
    const result = [
      {
        author: {},
        recipient: {},
        content: '123',
      },
    ];
    expect(await controller.getMessagesForMe(1)).toEqual(result);
    expect(mockMessagesService.getMessagesForMe).toHaveBeenCalled();
  });
  it('should get create message', async () => {
    const dto = {
      authorId: 1,
      recipientId: 2,
      content: '123',
    };
    expect(await controller.createMessage(dto)).toEqual(undefined);
    expect(mockMessagesService.createMessage).toHaveBeenCalled();
  });
});
