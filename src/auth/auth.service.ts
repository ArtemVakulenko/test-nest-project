import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { loginDTO, regDTO } from './dto/auth.dto';
import { googleLoginDTO } from '../auth/dto/auth.dto';
import { createHash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
    hashed: boolean,
  ): Promise<any> {
    if (!hashed) {
      const user = await this.usersService.findOneByEmail(email);
      const hash = createHash('sha256');
      hash.update(pass);
      const hashedPass = hash.digest('hex');
      if (user && user.password === hashedPass) {
        return true;
      }
      return false;
    }
    if (hashed) {
      const user = await this.usersService.findOneByEmail(email);
      if (user && user.password === pass) {
        return true;
      }
      return false;
    }
  }

  async login(body: loginDTO): Promise<any> {
    const payload = { email: body.email };
    const flag = await this.validateUser(body.email, body.password, false);
    if (flag) {
      return {
        token: this.jwtService.sign(payload),
      };
    }
  }

  async loginGoogle(body: googleLoginDTO): Promise<any> {
    console.log(body);
    const sameUser = await this.usersService.findOneByEmail(body.email);
    if (!sameUser) {
      await this.usersService.create(body);
    }
    const payload = { email: body.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async registrate(user: regDTO): Promise<any> {
    const sameUser = await this.usersService.findOneByEmail(user.email);
    if (sameUser) return { message: 'already exists' };
    await this.usersService.create(user);
  }
}
