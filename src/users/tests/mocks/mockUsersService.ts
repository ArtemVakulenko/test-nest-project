import { IUser } from '../../../users/dto/users.dto';
export const mockUsersService = {
  findAll: jest.fn((): IUser[] => {
    return [
      {
        id: 123,
        userName: '123',
        password: '123',
        avatar: '123',
      },
    ];
  }),
  create: jest.fn(),
  deleteOne: jest.fn(),
  updateOne: jest.fn(),
  findOne: jest.fn((id) => {
    return {
      id,
      userName: '123',
      password: '123',
      avatar: '123',
    };
  }),
  findOneByUserName: jest.fn((id) => {
    return {
      id,
      userName: '123',
      password: '123',
      avatar: '123',
    };
  }),
  findOneByEmail: jest.fn((id) => {
    return {
      userName: '123',
      password: '123',
      avatar: '123',
    };
  }),

  getMyFriends: jest.fn((id) => {
    return [
      {
        id: 123,
        userName: '123',
        password: '123',
        avatar: '123',
      },
    ];
  }),
  getMyFollowers: jest.fn((id) => {
    return [
      {
        id: 123,
        userName: '123',
        password: '123',
        avatar: '123',
      },
    ];
  }),
  getMyLeaders: jest.fn((id) => {
    return [
      {
        id: 123,
        userName: '123',
        password: '123',
        avatar: '123',
      },
    ];
  }),
};
