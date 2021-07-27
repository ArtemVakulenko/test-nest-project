import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { mockUsersService } from '../../users/tests/mocks/mockUsersService';
import { mockJwtService } from './mocks/mockJwtService';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(JwtService)
      .useValue(mockJwtService)
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should validate user', async () => {
    expect(await service.validateUser('123', '123', true)).toEqual(true);
    expect(await service.validateUser('123', '123', false)).toEqual(false);
  });
  it('should login user', async () => {
    const dto1 = {
      userName: '123',
      password: '123',
      email: '123',
      hashed: true,
    };
    const dto2 = {
      userName: '123',
      password: '123',
      email: '123',
      hashed: true,
    };
    expect(await service.login(dto1)).toEqual(undefined);
    expect(await service.login(dto2)).toEqual(undefined);
  });
});
