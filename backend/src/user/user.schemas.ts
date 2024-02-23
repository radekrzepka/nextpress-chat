import { z } from "zod";

export const signInSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6).max(30),
   rememberMe: z.boolean(),
});

export const signUpSchema = z.object({
   email: z.string().email(),
   username: z.string().min(6).max(30),
   password: z.string().min(6).max(30),
});

export const tokenSchema = z.string().min(40).max(40);

export const forgotPasswordSchema = z.object({
   email: z.string().email(),
});

export const updateForgottenPasswordSchema = z.object({
   newPassword: z.string().min(6).max(30),
});

export const idSchema = z.string();

export const avatarIdSchema = z.string();
