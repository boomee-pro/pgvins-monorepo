import { Injectable } from '@nestjs/common';
import { Prisma, Account } from '@prisma/client';
import argon2 from 'argon2';

import { PrismaService } from '../prisma.service';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    accountWhereUniqueInput: Prisma.AccountWhereInput,
  ): Promise<Account | null> {
    return this.prisma.account.findFirst({ where: accountWhereUniqueInput });
  }

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AccountWhereUniqueInput;
    where?: Prisma.AccountWhereInput;
  }) {
    const { skip, take, cursor, where } = params;
    return this.prisma.account.findMany({
      skip,
      take,
      cursor,
      where,
    });
  }

  async create(data: Prisma.AccountCreateInput): Promise<Account> {
    return this.prisma.account.create({
      data,
    });
  }
}
