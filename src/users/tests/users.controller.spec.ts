import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { mockUsersService } from './mocks/mockUsersService';

describe('UsersController', () => {
  let usersController: UsersController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {
      userName: '123',
      email: '123',
      password: '123',
    };
    const result = {
      id: expect.any(Number),
      userName: '123',
      email: '123',
      password: '123',
    };
    expect(await usersController.create(dto)).toEqual(result);
    expect(mockUsersService.create).toHaveBeenCalled();
  });
  it('should get all users', async () => {
    const result = [
      { id: 123, userName: '123', password: '123', avatar: '123' },
    ];
    expect(await usersController.findAll()).toEqual(result);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });
  it('should get one user', async () => {
    const result = { id: 1, userName: '123', password: '123', avatar: '123' };
    expect(await usersController.findOne(1)).toEqual(result);
    expect(mockUsersService.findOne).toHaveBeenCalled();
  });
});
