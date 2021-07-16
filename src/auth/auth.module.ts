import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { GoogleStrategy } from './google.strategy';
import { FacebookStrategy } from './facebook.strategy';
import { config } from 'dotenv';
config();

const jwtConfig = {
  secret: process.env.TOKEN_SECRET,
  signOptions: { expiresIn: '10h' },
};

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register(jwtConfig)],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, GoogleStrategy, FacebookStrategy],
})
export class AuthModule {}
