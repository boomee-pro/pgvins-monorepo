import cors from "cors";
import express, { RequestHandler } from "express";
import { json, urlencoded } from "body-parser";

import AuthController from "./controllers/auth.controller";
import WineController from "./controllers/wine.controller";
import Controller from "./types/controller";
import Server from "./types/server";

const app = express();
const port = parseInt(process.env.EXPRESS_PORT!) || 8080;
const server = new Server(app, port);

const controllers: Array<Controller> = [
  new AuthController(),
  new WineController(),
];

const globalMiddleware: Array<RequestHandler> = [
  urlencoded({ extended: false }),
  json(),
  cors({ credentials: true, origin: true }),
];

Promise.resolve().then(() => {
  server.loadMiddlewares(globalMiddleware);
  server.loadControllers(controllers);
  server.run();
});
