import { z } from "zod";

const emailError = "Email requise.";
const passwordError = "Le mot de passe doit comporter au minimum 8 caractères";
const lastnameError = "Le nom est requis.";
const firstnameErrror = "Le prénom est requis.";

export const PostUser = z.object({
  email: z.string().email(emailError),
  password: z.string().min(8, {
    message: passwordError,
  }),
  lastName: z.string().min(1, { message: lastnameError }),
  firstName: z.string().min(1, { message: firstnameErrror }),
});

export const GetUser = z.object({
  email: z.string().email(emailError),
  password: z.string().min(8, {
    message: passwordError,
  }),
});

export const PatchUser = z.object({
  email: z.string().email(emailError).nullish(),
  password: z
    .string()
    .min(8, {
      message: passwordError,
    })
    .nullish(),
  previousPassword: z
    .string()
    .min(8, {
      message: passwordError,
    })
    .nullish(),
  lastName: z.string().min(1, { message: lastnameError }).nullish(),
  firstName: z.string().min(1, { message: firstnameErrror }).nullish(),
});
