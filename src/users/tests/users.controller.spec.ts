import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { mockUsersService } from './mocks/mockUsersService';
import {
  mockCreateUserDto,
  mockIUserArray,
  mockIUser,
  mockPutUserDto,
} from './mocks/mocks';

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
    expect(await usersController.create(mockCreateUserDto)).toEqual(undefined);
    expect(mockUsersService.create).toHaveBeenCalled();
  });
  it('should get all users', async () => {
    expect(await usersController.findAll()).toEqual(mockIUserArray);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });
  it('should get one user', async () => {
    expect(await usersController.findOne(123)).toEqual(mockIUser);
    expect(mockUsersService.findOne).toHaveBeenCalled();
  });
  it('should get friends for user', async () => {
    expect(await usersController.getMyFriends(1)).toEqual(mockIUserArray);
    expect(mockUsersService.getMyFriends).toHaveBeenCalled();
  });
  it('should get followers for user', async () => {
    expect(await usersController.getMyFollowers(1)).toEqual(mockIUserArray);
    expect(mockUsersService.getMyFollowers).toHaveBeenCalled();
  });
  it('should get leaders for user', async () => {
    expect(await usersController.getMyLeaders(1)).toEqual(mockIUserArray);
    expect(mockUsersService.getMyLeaders).toHaveBeenCalled();
  });
  it('should delete user', async () => {
    expect(await usersController.delete(1)).toEqual(undefined);
    expect(mockUsersService.getMyLeaders).toHaveBeenCalled();
  });
  it('should update user', async () => {
    expect(await usersController.put(mockPutUserDto)).toEqual(undefined);
    expect(mockUsersService.getMyLeaders).toHaveBeenCalled();
  });
});
