import { Module } from '@nestjs/common';
import * as Redis from 'redis';

export const REDIS = Symbol('AUTH:REDIS');

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: Redis.createClient({ url: 'redis://localhost:6379' }),
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
