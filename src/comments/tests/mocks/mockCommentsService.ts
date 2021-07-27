export const mockCommentsService = {
  findAll: jest.fn(() => {
    return [
      {
        id: 123,
        content: '123',
        user: {},
        post: {},
        likes: 123,
      },
    ];
  }),
  findAllByPostId: jest.fn((id) => {
    return [
      {
        id: 123,
        content: '123',
        user: {},
        post: {},
        likes: 123,
      },
    ];
  }),
  findAllByUserId: jest.fn((id) => {
    return [
      {
        id: 123,
        content: '123',
        user: {},
        post: {},
        likes: 123,
      },
    ];
  }),
  addLike: jest.fn(),
  createComment: jest.fn(),
};
