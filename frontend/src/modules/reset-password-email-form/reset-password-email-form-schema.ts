import { z } from "zod";

export const resetPasswordEmailFormSchema = z.object({
   email: z.string().email(),
});

export type ResetPasswordEmailForm = z.infer<
   typeof resetPasswordEmailFormSchema
>;
