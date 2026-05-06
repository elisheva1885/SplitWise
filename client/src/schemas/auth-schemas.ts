import { z } from "zod";
export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at lease 3 characters long" }),
  email: z.email(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
      "Password must include upper, lower, number, and special character",
    ),
});

export type RegisterData = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at lease 3 characters long" }),
  password: z.string().min(1, { message: "password cant be empty" }),
});

export type LoginData = z.infer<typeof LoginSchema>;

export const ForgetPasswordSchema = z.object({
  email: z.email(),
});

export type ForgetPasswordData = z.infer<typeof ForgetPasswordSchema>;
