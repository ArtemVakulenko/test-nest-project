import { Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/helpers.ts/customDecorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(':login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Public()
  @Get(':profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
