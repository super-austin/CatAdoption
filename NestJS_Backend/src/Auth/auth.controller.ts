import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';
import { JWTAuthGuard } from '../auth-utils/auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JWTAuthGuard)
  @Get('/health')
  testHealth(): string {
    return this.authService.testHealth();
  }

  @Post('/register')
  async registerUser(@Body() { username, password }: AuthDto) {
    return this.authService.registerUser(username, password);
  }

  @Post('/login')
  async loginUser(@Body() { username, password }: AuthDto) {
    return this.authService.loginUser(username, password);
  }
}
