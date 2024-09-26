/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { name: string; email: string; password: string }) {
    return this.authService.signup(body);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }
  @Get('profile')
@UseGuards(AuthGuard('jwt'))
async getProfile(@Req() req) {
  return req.user;  
}
}