import z from "zod";

// email and password have their own PUT routes.
export const passwordModel = z.string().min(8, "Password is too short");
export const emailModel = z.string().email("Email is not valid");

export const userPostModel = z.object({
  email: emailModel,
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  password: passwordModel,
});

export const userPutModel = z.object({
  email: emailModel.nullish(),
  firstName: z.string().min(2, "First name is too short").nullish(),
  lastName: z.string().min(2, "Last name is too short").nullish(),
  password: passwordModel.nullish(),
});

export type userPostType = z.infer<typeof userPostModel>;
export type userPutType = {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
};
