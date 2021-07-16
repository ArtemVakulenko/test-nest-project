import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('successGoogleAuth')
  loginWithGoogle() {
    return 'google';
  }
}
