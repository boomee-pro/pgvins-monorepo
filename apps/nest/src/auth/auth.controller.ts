import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

import { AuthUser } from 'src/users/users.decorator';
import { AuthService } from './auth.service';
import { SignUp } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { ApiResponse } from 'src/models/api.model';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() signUp: SignUp): Promise<ApiResponse> {
    const user = await this.authService.register(signUp);
    return {
      message: 'success',
      data: user,
    };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@AuthUser() user: User): Promise<ApiResponse> {
    return {
      message: 'success',
      data: user,
    };
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request): Promise<void> {
    if (req.user) {
      req.logOut(() => {
        return;
      });
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  async googleAuth(@Req() req): Promise<void> {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return await this.authService.googleLogin(req);
  }
}
