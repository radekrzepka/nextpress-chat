import { z } from "zod";

export const newMessageSchema = z.object({
   id: z.string(),
   message: z.string(),
   creatorId: z.string(),
   receiverId: z.string(),
   type: z.enum(["sent", "received"]),
   sendingUserUsername: z.string(),
});

export type Message = z.infer<typeof newMessageSchema>;
