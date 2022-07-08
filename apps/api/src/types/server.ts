import { PrismaClient } from "@prisma/client";
import { Application, RequestHandler, Request, Response } from "express";
import http from "http";

import { prisma } from "../db/client";
import Controller from "./controller";

export default class Server {
  private app: Application;
  private prisma: PrismaClient;
  private readonly port: number;

  constructor(app: Application, port: number) {
    this.app = app;
    this.port = port;
    this.prisma = prisma;
  }

  public run(): http.Server {
    return this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}.`);
    });
  }

  public loadMiddlewares(middlewares: Array<RequestHandler>): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  public loadControllers(controllers: Array<Controller>): void {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.setRoutes());
    });
  }
}
