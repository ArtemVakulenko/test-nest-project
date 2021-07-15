import { Controller, Post, Get, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { WithoutAuth } from 'src/helpers.ts/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(':login')
  async login(@Body() body) {
    console.log(body);
    return this.authService.login(body);
  }
  @Get(':profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
