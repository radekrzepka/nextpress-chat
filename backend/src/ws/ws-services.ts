import { PrismaClient } from "@prisma/client";
import { verify, type JwtPayload } from "jsonwebtoken";
import WebSocket from "ws";
import { z } from "zod";

const prisma = new PrismaClient();

export declare class ExtendedWebSocket extends WebSocket {
   userId: string | null;
}

export const messageSchema = z.object({
   message: z.string(),
   recipient: z.string().uuid(),
});

export const authenticateWebSocket = (token: string): string | null => {
   try {
      const decoded = verify(
         token,
         process.env.JWT_SECRET_KEY as string
      ) as JwtPayload;
      return decoded.userId as string;
   } catch (error) {
      console.error("Failed to authenticate WebSocket connection:", error);
      return null;
   }
};

export const sentMessageToUser = async (
   senderId: string,
   receiverId: string,
   messageContent: string
) => {
   try {
      console.log(senderId, receiverId, messageContent);
      await prisma.message.create({
         data: {
            message: messageContent,
            receiverId,
            creatorId: senderId,
         },
      });
      console.log("Message sent successfully");
   } catch (error) {
      console.error("Error saving message to DB:", error);
   }
};
