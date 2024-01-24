import { z } from "zod";

const MIN_CHARS = 6;
const MAX_CHARS = 30;

export const resetPasswordFormSchema = z
   .object({
      password: z
         .string()
         .min(
            MIN_CHARS,
            `Your password must be between ${MIN_CHARS} and ${MAX_CHARS} characters long`
         )
         .max(
            MAX_CHARS,
            `Your password must be between ${MIN_CHARS} and ${MAX_CHARS} characters long`
         ),
      repeatPassword: z.string().min(1, "Please repeat your password"),
   })
   .refine(data => data.password === data.repeatPassword, {
      path: ["repeatPassword"],
      message: "Password don't match",
   });

export type ResetPasswordForm = z.infer<typeof resetPasswordFormSchema>;
