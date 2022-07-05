import argon2 from "argon2";

import { prisma } from "db/client";

import { PatchUser, PostUser } from "./users.models";
import { ApiResponse } from "utils/types";

export default class UsersService {
  async Get(): Promise<ApiResponse> {
    const users = await prisma.user.findMany();
    return { success: true, message: "Got all users.", data: users };
  }

  async GetOne(email: string): Promise<ApiResponse> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return { success: false, message: "Email not registered." };
    }
    return {
      success: true,
      message: "User found.",
      data: { ...user, password: null },
    };
  }

  async Create(data: any): Promise<ApiResponse> {
    const parsedUser = PostUser.safeParse(data);
    if (!parsedUser.success) {
      return { success: false, message: "Bad request body." };
    }
    const { data: userData } = parsedUser;

    const userExists = await this.GetOne(userData.email);
    if (userExists.success) {
      return { success: false, message: "Email already registered." };
    }

    const hash = await argon2.hash(userData.password);
    const newUser = await prisma.user.create({
      data: { ...userData, password: hash },
    });

    return {
      success: true,
      message: "User successfully registered.",
      data: { ...newUser, password: null },
    };
  }

  async EditOne(email: string, data: any): Promise<ApiResponse> {
    const parsedUser = PatchUser.safeParse(data);
    if (!parsedUser.success) {
      return { success: false, message: "Bad request body." };
    }
    let { data: userData } = parsedUser;

    const userExists = await this.GetOne(email);
    if (!userExists.success) {
      return { success: false, message: userExists.message };
    }
    const { data: user } = userExists;

    if (userData.password) {
      const hash = await argon2.hash(userData.password);
      userData = {
        ...userData,
        password: hash,
        previousPassword: user.password,
      };
    }

    const newData = Object.assign(user, userData);
    const newUser = await prisma.user.update({
      where: { email },
      data: { ...newData },
    });
    return { success: true, message: "User edited.", data: newUser };
  }

  async DeleteOne(email: string): Promise<ApiResponse> {
    const userExists = await this.GetOne(email);
    if (!userExists.success) {
      return { success: false, message: userExists.message };
    }
    const deletedUser = await prisma.user.delete({ where: { email } });

    return { success: true, message: "User deleted.", data: deletedUser };
  }
}
