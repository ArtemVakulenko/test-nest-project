export const mockFriendRequestService = {
  getAllMyReq: jest.fn(() => {
    return [
      {
        author: {},
        recipient: {},
        status: '123',
      },
    ];
  }),
  getAllReqsForMe: jest.fn(() => {
    return [
      {
        author: {},
        recipient: {},
        status: '123',
      },
    ];
  }),
  acceptFriendRequest: jest.fn(),
  createFriendRequest: jest.fn(),
};
