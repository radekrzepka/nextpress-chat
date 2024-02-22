import { PrismaClient } from "@prisma/client";
import { verify, type JwtPayload } from "jsonwebtoken";
import WebSocket, { WebSocketServer } from "ws";
import { z } from "zod";

export const wsServer = new WebSocketServer({ noServer: true });

const prisma = new PrismaClient();

declare class ExtendedWebSocket extends WebSocket {
   userId: string | null;
}

const messageSchema = z.object({
   message: z.string(),
   recipient: z.string().uuid(), // Assuming recipient should be a valid UUID
});

wsServer.on("connection", (ws: ExtendedWebSocket, req) => {
   const params = new URLSearchParams(req.url?.substring(req.url.indexOf("?")));
   const token = params.get("token");

   if (token) {
      const userId = authenticateWebSocket(token);
      if (!userId) {
         ws.close(1008, "Authentication failed");
         return;
      }

      ws.userId = userId;
   } else {
      ws.close(1008, "Authentication failed");
   }
   ws.on("message", data => {
      try {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-base-to-string
         const parsedData = JSON.parse(data.toString());

         console.log(parsedData);

         const result = messageSchema.safeParse(parsedData);

         if (!result.success) {
            ws.send(JSON.stringify({ error: "Invalid message format" }));
            return;
         }

         const { message, recipient } = result.data;
         console.log(
            `Received message: ${message} for recipient: ${recipient}`
         );

         // Now you can use the validated and parsed data as needed
         // For example, sending the message to the specified recipient
         wsServer.clients.forEach(async client => {
            const extendedClient = client as ExtendedWebSocket; // Type assertion
            console.log(extendedClient.userId, recipient);
            if (
               extendedClient.readyState === WebSocket.OPEN &&
               extendedClient.userId === recipient
            ) {
               extendedClient.send(`Message: ${message}`);
               await sentMessageToUser(ws.userId as string, recipient, message);
            }
         });
      } catch (error) {
         // Handle JSON parsing errors or other exceptions
         console.error("Failed to parse message data:", error);
         ws.send(JSON.stringify({ error: "Failed to parse message data" }));
      }
   });

   ws.on("close", () => console.log("Client has disconnected!"));

   ws.onerror = error => {
      console.error("WebSocket error:", error);
   };
});

const authenticateWebSocket = (token: string): string | null => {
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
