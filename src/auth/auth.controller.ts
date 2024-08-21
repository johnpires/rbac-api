import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.authService.login(username, password);
  }

  @Post('register')
  async register(@Body() userDto: any) {
    return this.authService.register(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
