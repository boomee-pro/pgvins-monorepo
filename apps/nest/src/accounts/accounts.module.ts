import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AccountsService } from './accounts.service';

@Module({
  providers: [AccountsService, PrismaService],
})
export class AccountsModule {}
