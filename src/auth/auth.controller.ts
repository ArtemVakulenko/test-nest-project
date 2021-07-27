import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOperation,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { regDTO, loginDTO } from './dto/auth.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';
import { loginAnswerDTO } from './dto/auth.dto';
import urls from '../constants/urls';

@ApiTags('Authorization controller')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'login and get JWT' })
  @ApiBody({ type: loginDTO })
  @ApiCreatedResponse({ type: loginAnswerDTO })
  async login(@Body() loginDTO: loginDTO) {
    return this.authService.login(loginDTO);
  }

  @Get('google')
  @ApiOperation({ summary: 'authorize with google' })
  @UseGuards(GoogleAuthGuard)
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('facebook')
  @ApiOperation({ summary: 'authorize with facebook' })
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('google/callback')
  @ApiOperation({ summary: 'redirect URL for google auth' })
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req, @Res() res) {
    if (req.user) {
      this.authService.loginGoogle({
        email: req.user.email,
        provider: 'google',
      });
      res.redirect(`${urls.active}/successGoogleAuth`);
    } else res.redirect(`${urls.active}/loginFailure`);
  }

  @Get('/facebook/redirect')
  @ApiOperation({ summary: 'redirect URL for google auth' })
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Req() req): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Post('reg')
  @ApiOperation({ summary: 'registrate user' })
  @ApiBody({ type: regDTO })
  @ApiCreatedResponse()
  async registrate(@Body() regDTO: regDTO) {
    return this.authService.registrate(regDTO);
  }
}
