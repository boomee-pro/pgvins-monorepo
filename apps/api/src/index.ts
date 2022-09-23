import express, { RequestHandler } from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import RedisStore from "connect-redis";
import Redis from "ioredis";

import AuthController from "./controllers/auth.controller";
import WineController from "./controllers/wine.controller";
import { GithubOAuthStrategy } from "./strategies/github.strategy";
import { GoogleOAuthStrategy } from "./strategies/google.strategy";
import { FacebookOAuthStrategy } from "./strategies/facebook.strategy";
import {
  LocalLoginStrategy,
  LocalRegisterStrategy,
} from "./strategies/local.strategy";

import Controller from "./types/controller";
import Server from "./types/server";
import Strategy from "./types/strategy";
import { config } from "dotenv";
config();

const app = express();
const port = parseInt(process.env.EXPRESS_PORT);
const server = new Server(app, port, passport);
const redis = new Redis();

const controllers: Array<Controller> = [
  new AuthController(),
  new WineController(),
];

const globalMiddleware: Array<RequestHandler> = [
  express.json(),
  express.urlencoded({ extended: false }),
  cors({ credentials: true, origin: process.env.CORS_ORIGIN }),
  session({
    store: new (RedisStore(session))({
      client: redis,
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 3600000, // 1 week
      sameSite: "strict",
    },
  }),
  passport.initialize(),
  passport.session(),
];

const globalStrategies: Array<Strategy> = [
  new LocalLoginStrategy(),
  new LocalRegisterStrategy(),
  new GoogleOAuthStrategy(),
  new GithubOAuthStrategy(),
  new FacebookOAuthStrategy(),
];

Promise.resolve().then(() => {
  server.loadMiddlewares(globalMiddleware);
  server.loadStrategies(globalStrategies);
  server.loadControllers(controllers);
  server.run();
});
