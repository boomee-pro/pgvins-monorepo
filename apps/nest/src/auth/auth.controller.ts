import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { AuthUser } from 'src/users/users.decorator';
import { AuthService } from './auth.service';
import { SignUp } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() signUp: SignUp): Promise<User> {
    return this.authService.register(signUp);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@AuthUser() user: User): Promise<User> {
    return user;
  }
}
