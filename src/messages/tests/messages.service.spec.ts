import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MessageEntity } from '../../database/entities/Message.entity';
import { MessagesService } from '../messages.service';
import { mockMessagesRepository } from './mocks/mockMessagesRepository';
import { mockUsersRepository } from '../../users/tests/mocks/mockUsersRepository';
import { UserEntity } from '../../database/entities/User.entity';

describe('PostsService', () => {
  let service: MessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        {
          provide: getRepositoryToken(MessageEntity),
          useValue: mockMessagesRepository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should get all messages', async () => {
    const result = [{ author: {}, recipient: {}, content: '123' }];
    expect(await service.getAllMessages()).toEqual(result);
    expect(mockMessagesRepository.find).toHaveBeenCalled();
  });
  it('should find all messages for user by userId', async () => {
    const result = [{ author: {}, recipient: {}, content: '123' }];
    expect(await service.getMyMessages(1)).toEqual(result);
    expect(mockMessagesRepository.find).toHaveBeenCalled();
  });
  it('should find all messages by user by userId', async () => {
    const result = [{ author: {}, recipient: {}, content: '123' }];
    expect(await service.getMessagesForMe(1)).toEqual(result);
    expect(mockMessagesRepository.find).toHaveBeenCalled();
  });

  it('should create message', async () => {
    const dto = { authorId: 1, recipientId: 2, content: '123' };
    expect(await service.createMessage(dto)).toEqual(undefined);
    expect(mockUsersRepository.findOne).toHaveBeenCalled();
    expect(mockMessagesRepository.create).toHaveBeenCalled();
    expect(mockMessagesRepository.save).toHaveBeenCalled();
  });
});
