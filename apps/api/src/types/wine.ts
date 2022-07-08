import z from "zod";

export const winePostModel = z.object({
  name: z.string().min(2, "Name is too short"),
  origin: z.string().min(2, "Origin is too short"),
  price: z.number().min(0, "Price is too low"),
  img: z.string().min(2, "Image link is too short").nullish(),
  flag: z.string().min(2, "Flag link is too short").nullish(),
});

export const winePutModel = winePostModel.partial();
