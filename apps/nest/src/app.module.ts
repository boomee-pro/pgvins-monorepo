import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { config } from 'dotenv';
config();

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { WinesModule } from './wines/wines.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AccountsModule,
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
export class AppModule {}
