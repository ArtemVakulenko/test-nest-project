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
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { regDTO, loginDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: loginDTO) {
    return this.authService.login(loginDTO);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleLoginCallback(@Req() req, @Res() res) {
    if (req.user) {
      this.authService.loginGoogle({
        email: req.user.email,
        provider: 'google',
      });
      res.redirect('http://localhost:3000/successGoogleAuth');
    } else res.redirect('http://localhost:3000/login/failure');
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() body): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: body,
    };
  }

  @Post('reg')
  async registrate(@Body() regDTO: regDTO) {
    return this.authService.registrate(regDTO);
  }
}
