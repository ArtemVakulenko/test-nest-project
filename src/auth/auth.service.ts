import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/database/entities/User.entity';
import { loginDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOnByUserName(userName);
    if (user && user.password === pass) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async login(user: UserEntity) {
    console.log(user);
    const payload = { username: user.userName, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
