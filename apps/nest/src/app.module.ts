import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import { createClient } from 'redis';
import {
  CacheInterceptor,
  CacheModule,
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { RedisModule, REDIS } from './redis/redis.module';
import { WinesModule } from './wines/wines.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AccountsModule,
    RedisModule,
    CacheModule.register({
      ttl: 30, // seconds
      max: 10, // maximum number of items in cache
    }),
    WinesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS) private readonly redis: ReturnType<typeof createClient>,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: 'sup3rs3cr3t',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
      )
      .forRoutes('*');
  }
}
