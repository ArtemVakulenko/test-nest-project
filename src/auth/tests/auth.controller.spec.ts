import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { mockAuthService } from './mocks/mockAuthService';

describe('UsersController', () => {
  let controller: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();
    controller = module.get<AuthController>(AuthController);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login user', async () => {
    const dto = {
      userName: '123',
      email: '123',
      password: '123',
    };
    expect(await controller.login(dto)).toEqual({ token: dto.userName });
    expect(mockAuthService.login).toHaveBeenCalled();
  });
  it('should registrate user', async () => {
    const dto = {
      userName: '123',
      email: '123',
      password: '123',
    };
    expect(await controller.registrate(dto)).toEqual(undefined);
    expect(mockAuthService.registrate).toHaveBeenCalled();
  });
  it('should login user with google', async () => {
    expect(await controller.googleLogin()).toEqual(200);
  });
  it('should login user with facebook', async () => {
    expect(await controller.facebookLogin()).toEqual(200);
  });
  it('should redirect to succesGoogleAuth', async () => {
    const mockReq = { user: true };
    const mockRes = { redirect: jest.fn() };
    expect(await controller.googleLoginCallback(mockReq, mockRes)).toEqual(
      undefined,
    );
    expect(mockAuthService.loginGoogle).toHaveBeenCalled();
  });
  it('should redirect to failedLogin', async () => {
    const mockReq = { user: false };
    const mockRes = { redirect: jest.fn() };
    expect(await controller.googleLoginCallback(mockReq, mockRes)).toEqual(
      undefined,
    );
  });
});
