import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/database/entities/User.entity';
import { loginDTO, regDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(userName);
    if (user && user.password === pass) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async login(user: loginDTO) {
    const payload = { email: user.email };
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
