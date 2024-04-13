import { Controller, Get, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
