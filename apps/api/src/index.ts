import cors from "cors";
import express, { RequestHandler } from "express";
import session from "express-session";
import passport from "passport";

import AuthController from "./controllers/auth.controller";
import WineController from "./controllers/wine.controller";
import { GoogleOAuthStrategy } from "./strategies/google.strategy";
import {
  LocalLoginStrategy,
  LocalRegisterStrategy,
} from "./strategies/local.strategy";
import Controller from "./types/controller";
import Server from "./types/server";
import Strategy from "./types/strategy";

const app = express();
const port = parseInt(process.env.EXPRESS_PORT!) || 8080;
const server = new Server(app, port, passport);

const controllers: Array<Controller> = [
  new AuthController(),
  new WineController(),
];

const globalMiddleware: Array<RequestHandler> = [
  express.json(),
  express.urlencoded({ extended: false }),
  cors({ credentials: true, origin: "http://localhost:3000" }),
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 360000,
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
];

Promise.resolve().then(() => {
  server.loadMiddlewares(globalMiddleware);
  server.loadStrategies(globalStrategies);
  server.loadControllers(controllers);
  server.run();
});
