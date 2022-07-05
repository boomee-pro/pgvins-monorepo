import { z } from "zod";

export const PostWine = z.object({
  name: z.string().min(1),
  origin: z.string().min(1),
  price: z.number().min(1),
  img: z.number().min(1).nullish(),
  flag: z.number().min(1).nullish(),
});

export const PatchWine = z.object({
  name: z.string().min(1).nullish(),
  origin: z.string().min(1).nullish(),
  price: z.number().min(1).nullish(),
  img: z.number().min(1).nullish(),
  flag: z.number().min(1).nullish(),
});
