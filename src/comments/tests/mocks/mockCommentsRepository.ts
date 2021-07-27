export const mockCommentsRepository = {
  find: jest.fn(() => {
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
  increment: jest.fn(),
  create: jest.fn((dto) => {
    return {
      content: dto.content,
    };
  }),
};
