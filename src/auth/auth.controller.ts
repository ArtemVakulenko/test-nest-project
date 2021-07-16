import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { regDTO, loginDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: loginDTO) {
    return this.authService.login(loginDTO);
  }
  @Post('reg')
  async registrate(@Body() regDTO: regDTO) {
    return this.authService.registrate(regDTO);
  }
}
