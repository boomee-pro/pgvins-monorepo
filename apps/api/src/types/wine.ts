import z from "zod";

export const winePostModel = z.object({
  name: z.string().min(2, "Name is too short"),
  origin: z.string().min(2, "Origin is too short"),
  price: z.number().min(0, "Price is too low"),
  img: z.string().min(2, "Image link is too short").nullish(),
  flag: z.string().min(2, "Flag link is too short").nullish(),
});

export const winePutModel = z.object({
  name: z.string().min(2, "Name is too short").nullish(),
  origin: z.string().min(2, "Origin is too short").nullish(),
  price: z.number().min(0, "Price is too low").nullish(),
  img: z.string().min(2, "Image link is too short").nullish(),
  flag: z.string().min(2, "Flag link is too short").nullish(),
});

export type winePostType = z.infer<typeof winePostModel>;
export type winePutType = {
  name?: string;
  origin?: string;
  price?: number;
  img?: string;
  flag?: string;
};
