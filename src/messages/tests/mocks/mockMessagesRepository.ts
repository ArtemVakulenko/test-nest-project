export const mockMessagesRepository = {
  find: jest.fn(() => {
    return [{ author: {}, recipient: {}, content: '123' }];
  }),
  create: jest.fn((dto) => {
    return {
      content: dto.content,
    };
  }),
  save: jest.fn(),
};
