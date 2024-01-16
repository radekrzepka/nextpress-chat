import { z } from "zod";

export const signUpSchema = z.object({
   email: z.string().email(),
   username: z.string().min(6).max(30),
   password: z.string().min(6).max(30),
});

export const signInSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6).max(30),
});
