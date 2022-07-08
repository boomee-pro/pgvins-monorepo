import argon2 from "argon2";
import { NextFunction, Request, Response } from "express";

import UserService from "../services/user.service";
import Controller, { Methods } from "../types/controller";
import { prisma } from "../db/client";
import {
  userPostModel,
  emailModel,
  passwordModel,
  userPutModel,
  userPutType,
} from "../types/user";

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
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const dbUser = await userService.findOne(email);
      if (!dbUser.success) {
        super.sendError(res, dbUser.message);
      }
      const user = dbUser.data;
      const passwordMatch = await argon2.verify(user!.password, password);
      if (!passwordMatch) {
        super.sendError(res, "Invalid password");
      }
      super.sendSuccess(res, { email }, "Login successful");
    } catch (error) {
      console.log(error);
      super.sendError(res);
    }
  }

  async handleLogout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      super.sendSuccess(res, {}, "Logout successful");
    } catch (error) {
      console.log(error);
      super.sendError(res);
    }
  }

  async handleRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body;
      // already validated in the frontend.
      const parsedUser = userPostModel.parse(user);
      const hashedPassword = await argon2.hash(parsedUser.password);
      const dbUser = await userService.create({
        ...parsedUser,
        password: hashedPassword,
      });
      if (!dbUser.success) {
        super.sendError(res, dbUser.message);
        return;
      }
      super.sendSuccess(
        res,
        { email: parsedUser.email },
        "Registration successful"
      );
    } catch (error) {
      console.log(error);
      super.sendError(res);
    }
  }

  async handleEmailUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { email } = req.body;
      const parsedEmail = emailModel.parse(email);
      const dbUser = await userService.update(id, { email: parsedEmail });
      if (!dbUser.success) {
        super.sendError(res, dbUser.message);
        return;
      }
      super.sendSuccess(res, { email }, "Email update successful");
    } catch (error) {
      console.log(error);
      super.sendError(res);
    }
  }

  async handlePasswordUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { password } = req.body;
      const parsedPassword = passwordModel.parse(password);
      const dbUser = await userService.update(id, { password: parsedPassword });
      if (!dbUser.success) {
        super.sendError(res, dbUser.message);
        return;
      }
      super.sendSuccess(res, {}, "Password update successful");
    } catch (error) {
      console.log(error);
      super.sendError(res);
    }
  }

  async handleUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = req.body;
      const parsedUser = userPutModel.parse(user);
      const dbUser = await userService.update(id, parsedUser as userPutType);
      if (!dbUser.success) {
        super.sendError(res, dbUser.message);
        return;
      }
      super.sendSuccess(res, {}, "Email update successful");
    } catch (error) {
      console.log(error);
      super.sendError(res);
    }
  }

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
