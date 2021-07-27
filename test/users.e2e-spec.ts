import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/database/entities/User.entity';
import { FriendRequestEntity } from '../src/database/entities/FriendRequest.entity';
import { mockUsersRepository } from '../src/users/tests/mocks/mockUsersRepository';
import { mockFriendRequestRepository } from '../src/users/tests/mocks/mockFriendRequestRepository';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(UserEntity))
      .useValue(mockUsersRepository)
      .overrideProvider(getRepositoryToken(FriendRequestEntity))
      .useValue(mockFriendRequestRepository)
      .overrideGuard(JwtAuthGuard)
      .useValue(null)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200);
  });
});
