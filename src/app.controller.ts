import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('successGoogleAuth')
  loginWithGoogle() {
    return 'you have logined with google succesfully';
  }
  @Get()
  qwerty() {
    return 'hello from nest';
  }
}
