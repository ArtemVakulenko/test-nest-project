export const mockPostsRepository = {
  find: jest.fn(() => {
    return [
      {
        id: 123,
        userName: '123',
        password: '123',
        avatar: '123',
      },
    ];
  }),
  findOne: jest.fn(({ id }) => {
    return {
      id: 123,
      userName: '123',
      password: '123',
      avatar: '123',
    };
  }),
  query: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};
