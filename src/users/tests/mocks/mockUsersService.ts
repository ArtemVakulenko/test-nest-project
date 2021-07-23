export const mockUsersService = {
  findAll: jest.fn(() => {
    return [
      {
        id: 123,
        userName: '123',
        password: '123',
        avatar: '123',
      },
    ];
  }),
  create: jest.fn((dto) => {
    return {
      id: 1,
      ...dto,
    };
  }),
  findOne: jest.fn((id) => {
    return {
      id,
      userName: '123',
      password: '123',
      avatar: '123',
    };
  }),
};
