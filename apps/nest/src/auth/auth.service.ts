import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';

import { AccountsService } from 'src/accounts/accounts.service';
import { UsersService } from 'src/users/users.service';
import { SignUp } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly accountsService: AccountsService,
  ) {}

  async register(signUp: SignUp): Promise<User> {
    const user = await this.usersService.findOne({ email: signUp.email });
    if (user) {
      throw new UnauthorizedException(
        `There is already a user with email: ${signUp.email}`,
      );
    }
    const newUser = await this.usersService.create({
      email: signUp.email,
      lastName: signUp.lastName,
      firstName: signUp.firstName,
    });
    const hashed = await argon2.hash(signUp.password);
    await this.accountsService.create({
      password: hashed,
      user: { connect: { id: newUser.id } },
      provider: { connect: { name: 'local' } },
    });
    return newUser;
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ email });
    if (!user) {
      throw new UnauthorizedException(`There is no user with email: ${email}`);
    }

    const account = await this.accountsService.findOne({
      userId: user.id,
      providerName: 'local',
    });
    if (!account) {
      const hashed = await argon2.hash(password);
      await this.accountsService.create({
        user: { connect: { id: user.id } },
        provider: { connect: { name: 'local' } },
        password: hashed,
      });
      return user;
    }
    const isValid = await argon2.verify(account.password, password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }
}
