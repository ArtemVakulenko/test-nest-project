export const mockFriendRequestRepository = {
  find: jest.fn(() => {
    return [
      {
        id: 123,
        author: { id: 1 },
        recipient: { id: 2 },
        status: '123',
      },
    ];
  }),
  findOne: jest.fn(({ id }) => {
    return {
      id: 123,
      author: { id: 1 },
      recipient: { id: 2 },
      status: '123',
    };
  }),
  create: jest.fn(() => {
    console.log('mock create');
    return {
      status: '123',
    };
  }),
  update: jest.fn(),
  save: jest.fn(),
};
