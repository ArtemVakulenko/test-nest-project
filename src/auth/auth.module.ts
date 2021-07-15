import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
// import * as dotenv from 'dotenv';
// dotenv.config({ path: '../../../.env' });

const jwtConfig = {
  secret: '123',
  signOptions: { expiresIn: '600s' },
};

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register(jwtConfig)],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
