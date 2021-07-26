export const mockMessagesService = {
  getAllMessages: jest.fn(() => {
    return [
      {
        author: {},
        recipient: {},
        content: '123',
      },
    ];
  }),
  getMessagesForMe: jest.fn(() => {
    return [
      {
        author: {},
        recipient: {},
        content: '123',
      },
    ];
  }),
  getMyMessages: jest.fn(() => {
    return [
      {
        author: {},
        recipient: {},
        content: '123',
      },
    ];
  }),
  createMessage: jest.fn(),
};
