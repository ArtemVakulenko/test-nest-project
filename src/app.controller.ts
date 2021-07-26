import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('successGoogleAuth')
  loginWithGoogle() {
    return 'you have logined with google succesfully';
  }
  @Get('successFacebookAuth')
  loginWithFacebook() {
    return 'you have logined with facebook succesfully';
  }
  @Get('loginFailure')
  loginFailure() {
    return 'something went wrong';
  }
  // @Get()
  // qwerty() {
  //   return 'hello from nest';
  // }
}
