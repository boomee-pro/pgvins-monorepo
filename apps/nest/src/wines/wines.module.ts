import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { WinesController } from './wines.controller';
import { WinesService } from './wines.service';

@Module({
  controllers: [WinesController],
  providers: [WinesService, PrismaService],
})
export class WinesModule {}
