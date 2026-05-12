import { z } from "zod";
import zxcvbn from "zxcvbn";

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at lease 3 characters long" }),
  email: z.email(),
  password: z.string().superRefine((password, ctx) => {
    const result = zxcvbn(password);

    if (result.score < 3) {
      ctx.addIssue({
        code: "custom",
        message:
          result.feedback.warning ||
          result.feedback.suggestions[0] ||
          "Password is too weak",
      });
    }
  }),
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
