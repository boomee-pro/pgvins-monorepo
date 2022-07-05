import argon2 from "argon2";

import { prisma } from "db/client";

import { PostWine, PatchWine } from "./wines.models";
import { ApiResponse } from "utils/types";

export default class WinesService {
  async Get(): Promise<ApiResponse> {
    const wines = await prisma.wine.findMany();
    return { success: true, message: "Got all wines.", data: wines };
  }

  async GetOne(id: string): Promise<ApiResponse> {
    const wine = await prisma.wine.findUnique({ where: { id } });
    if (!wine) {
      return { success: false, message: "Wine not found." };
    }
    return { success: true, message: "Wine found.", data: wine };
  }

  async Create(data: any): Promise<ApiResponse> {
    const parsedWine = PostWine.safeParse(data);
    if (!parsedWine.success) {
      return { success: false, message: "Bad request body." };
    }
    const { data: wineData } = parsedWine;

    // TODO: add unique attribute to wines in order to check for duplicates ?

    const newWine = await prisma.wine.create({ data: wineData });
    return { success: true, message: "Wine created.", data: newWine };
  }

  async EditOne(id: string, data: any): Promise<ApiResponse> {
    const parsedWine = PatchWine.safeParse(data);
    if (!parsedWine.success) {
      return { success: false, message: "Bad request body." };
    }
    const { data: wineData } = parsedWine;

    const wine = await this.GetOne(id);
    if (!wine.success) {
      return { success: false, message: wine.message };
    }

    const newData = Object.assign(wine, wineData);
    // TODO: fix "data" type issue below
    const newWine = await prisma.wine.update({ where: { id }, data: newData });
    return {
      success: true,
      message: "Wine successfully created.",
      data: newWine,
    };
  }

  async DeleteOne(id: string): Promise<ApiResponse> {
    const wine = await this.GetOne(id);
    if (!wine.success) {
      return { success: false, message: wine.message };
    }

    const deletedWine = await prisma.wine.delete({ where: { id } });
    return {
      success: true,
      message: "Wine successfully deleted.",
      data: deletedWine,
    };
  }
}
