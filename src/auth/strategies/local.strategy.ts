import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { IUser } from '../../users/dto/users.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    userName: string,
    password: string,
  ): Promise<IUser | UnauthorizedException> {
    const user = await this.authService.validateUser(userName, password, false);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
