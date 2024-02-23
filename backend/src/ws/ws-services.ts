import { PrismaClient } from "@prisma/client";
import type { IncomingMessage } from "http";
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
      const { id: newMessageId } = await prisma.message.create({
         data: {
            message: messageContent,
            receiverId,
            creatorId: senderId,
         },
      });
      return newMessageId;
   } catch (error) {
      console.error("Error saving message to DB:", error);
   }
};

export const sendUpdateMessage = (
   wsServer: WebSocket.Server<typeof WebSocket, typeof IncomingMessage>
) => {
   wsServer.clients.forEach(client => {
      const extendedClient = client as ExtendedWebSocket;

      if (extendedClient.readyState === WebSocket.OPEN) {
         extendedClient.send(
            JSON.stringify({ message: "Online state Update online state" })
         );
      }
   });
};
