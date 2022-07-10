import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import Redis from 'ioredis';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
config();

import { AppModule } from './app.module';

async function bootstrap() {
  const client = new Redis();
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      store: new (RedisStore(session))({
        client: client,
      }),
      saveUninitialized: true,
      secret: process.env.SECRET || 'supersecret',
      cookie: {},
      resave: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
