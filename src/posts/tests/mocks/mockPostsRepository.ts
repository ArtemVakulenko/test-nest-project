export const mockPostsRepository = {
  find: jest.fn(() => {
    return [
      {
        id: 123,
        content: '123',
        user: {},
        likes: 123,
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
  create: jest.fn(() => {
    return {
      id: 123,
      content: '123',
    };
  }),
  increment: jest.fn(),
  save: jest.fn(),
};
