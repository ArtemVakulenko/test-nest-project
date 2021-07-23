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
    expect(await usersController.create(dto)).toEqual(undefined);
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
  it('should get friends for user', async () => {
    const result = [
      { id: 123, userName: '123', password: '123', avatar: '123' },
    ];
    expect(await usersController.getMyFriends(1)).toEqual(result);
    expect(mockUsersService.getMyFriends).toHaveBeenCalled();
  });
  it('should get followers for user', async () => {
    const result = [
      { id: 123, userName: '123', password: '123', avatar: '123' },
    ];
    expect(await usersController.getMyFollowers(1)).toEqual(result);
    expect(mockUsersService.getMyFollowers).toHaveBeenCalled();
  });
  it('should get leaders for user', async () => {
    const result = [
      { id: 123, userName: '123', password: '123', avatar: '123' },
    ];
    expect(await usersController.getMyLeaders(1)).toEqual(result);
    expect(mockUsersService.getMyLeaders).toHaveBeenCalled();
  });
  it('should delete user', async () => {
    expect(await usersController.delete(1)).toEqual(undefined);
    expect(mockUsersService.getMyLeaders).toHaveBeenCalled();
  });
  it('should update user', async () => {
    const dto = { id: 123, userName: '123', password: '123', avatar: '123' };
    expect(await usersController.put(dto)).toEqual(undefined);
    expect(mockUsersService.getMyLeaders).toHaveBeenCalled();
  });
});
