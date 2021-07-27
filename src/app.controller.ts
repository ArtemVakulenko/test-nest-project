import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Root controller')
@Controller()
export class AppController {
  @Get('successGoogleAuth')
  @ApiOperation({
    summary: 'redirect here from successful google auth',
  })
  @ApiOkResponse({ type: String })
  loginWithGoogle() {
    return 'you have logined with google succesfully';
  }

  @Get('successFacebookAuth')
  @ApiOperation({ summary: 'redirect here from successful facebook auth' })
  @ApiOkResponse({ type: String })
  loginWithFacebook() {
    return 'you have logined with facebook succesfully';
  }

  @Get('loginFailure')
  @ApiOperation({ summary: 'redirect here from failed provider auth' })
  @ApiOkResponse({ type: String })
  loginFailure() {
    return 'something went wrong';
  }

  @Get()
  @ApiOperation({ summary: 'first route' })
  @ApiOkResponse({ type: String })
  qwerty() {
    return 'hello from nest';
  }
}
