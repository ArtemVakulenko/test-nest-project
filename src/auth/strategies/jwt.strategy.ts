import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { IUser } from '../../users/interface/users.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { config } from 'dotenv';
import { UsersService } from 'src/users/users.service';
config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN_SECRET,
    });
  }

  async validate(payload: any): Promise<boolean | UnauthorizedException> {
    const user = await this.usersService.findOneByEmail(payload.email);
    const flag = await this.authService.validateUser(
      payload.email,
      user.password,
      true,
    );
    if (!flag) {
      throw new UnauthorizedException();
    }
    return flag;
  }
}
