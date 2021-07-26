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
import { AuthService } from './auth.service';
import { regDTO, loginDTO } from './dto/auth.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: loginDTO) {
    return this.authService.login(loginDTO);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('facebook')
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleLoginCallback(@Req() req, @Res() res) {
    if (req.user) {
      this.authService.loginGoogle({
        email: req.user.email,
        provider: 'google',
      });
      res.redirect('https://test-nest.pp.ua/successGoogleAuth');
    } else res.redirect('https://test-nest.pp.ua/loginFailure');
  }

  @Get('/facebook/redirect')
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Req() req, @Res() res): Promise<any> {
    if (req.user) {
      this.authService.loginFacebook({
        email: req.user.email,
        provider: 'facebook',
      });
      res.redirect('https://test-nest.pp.ua/successFacebookAuth');
    } else res.redirect('https://test-nest.pp.ua/loginFailure');
  }

  @Post('reg')
  async registrate(@Body() regDTO: regDTO) {
    return this.authService.registrate(regDTO);
  }
}
