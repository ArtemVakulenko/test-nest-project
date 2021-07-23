export const mockPostsService = {
  findAll: jest.fn(() => {
    return [
      {
        id: 123,
        content: '123',
        user: {
          id: 123,
          userName: '123',
          password: '123',
          avatar: '123',
        },
        likes: 123,
      },
    ];
  }),
  findAllByUserId: jest.fn(() => {
    return [
      {
        id: 123,
        content: '123',
        user: {
          id: 123,
          userName: '123',
          password: '123',
          avatar: '123',
        },
        likes: 123,
      },
    ];
  }),
  addLike: jest.fn(),
  createPost: jest.fn(),
};
