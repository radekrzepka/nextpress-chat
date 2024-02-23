import { z } from "zod";

export const newMessageSchema = z.object({
   type: z.enum(["sent", "received"]),
   message: z.string(),
   id: z.string(),
   username: z.string().optional(),
});

export type Message = z.infer<typeof newMessageSchema>;
