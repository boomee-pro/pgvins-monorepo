import { NextFunction, Request, Response } from "express";

import UserService from "../services/user.service";
import Controller, { Methods } from "../types/controller";
import { prisma } from "../db/client";

const userService = new UserService(prisma);

export default class AuthController extends Controller {
  path = "/auth";
  routes = [
    {
      path: "/login",
      method: Methods.POST,
      handler: this.handleLogin,
      localMiddleware: [],
    },
    {
      path: "/logout",
      method: Methods.GET,
      handler: this.handleLogout,
      localMiddleware: [],
    },
    {
      path: "/register",
      method: Methods.POST,
      handler: this.handleRegister,
      localMiddleware: [],
    },
    {
      path: "/password/:id",
      method: Methods.PUT,
      handler: this.handlePasswordUpdate,
      localMiddleware: [],
    },
    {
      path: "/email/:id",
      method: Methods.PUT,
      handler: this.handleEmailUpdate,
      localMiddleware: [],
    },
    {
      path: "/user/:id",
      method: Methods.PUT,
      handler: this.handleEmailUpdate,
      localMiddleware: [],
    },
    {
      path: "/user/:id",
      method: Methods.DELETE,
      handler: this.handleDelete,
      localMiddleware: [],
    },
  ];

  constructor() {
    super();
  }

  async handleLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async handleLogout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async handleRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async handleEmailUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async handlePasswordUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async handleUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}

  async handleDelete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const dbUser = await userService.delete(id);
      if (!dbUser.success) {
        super.sendError(res, dbUser.message);
        return;
      }
      super.sendSuccess(res, {}, "User deleted");
    } catch (error) {
      console.log(error);
      super.sendError(res);
    }
  }
}
