import { z } from "zod";

export const signInFormSchema = z.object({
   email: z.string().email(),
   password: z.string().min(1),
   rememberMe: z.boolean(),
});

export type SignInForm = z.infer<typeof signInFormSchema>;
