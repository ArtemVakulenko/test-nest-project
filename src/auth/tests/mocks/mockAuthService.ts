export const mockAuthService = {
  login: jest.fn((dto) => {
    return {
      token: dto.userName,
    };
  }),
  registrate: jest.fn(),
  loginGoogle: jest.fn(() => {
    return {};
  }),
  facebookLogin: jest.fn(() => {
    return {};
  }),
};
