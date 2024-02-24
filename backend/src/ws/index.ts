import WebSocket, { WebSocketServer } from "ws";
import type { ExtendedWebSocket } from "./ws-services";
import {
   authenticateWebSocket,
   messageSchema,
   sendUpdateMessage,
   sentMessageToUser,
} from "./ws-services";
import { updateOnlineState, userDataQuery } from "../user/user.services";

export const wsServer = new WebSocketServer({ noServer: true });

wsServer.on("connection", async (ws: ExtendedWebSocket, req) => {
   const params = new URLSearchParams(req.url?.substring(req.url.indexOf("?")));
   const token = params.get("token");

   if (token) {
      const userId = authenticateWebSocket(token);
      if (!userId) {
         ws.close(1008, "Authentication failed");
         return;
      }

      const stateIsUpdated = await updateOnlineState(userId, true);
      if (stateIsUpdated) sendUpdateMessage(wsServer);

      ws.userId = userId;
   } else {
      ws.close(1008, "Authentication failed");
   }
   ws.on("message", async data => {
      try {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-base-to-string
         const parsedData = JSON.parse(data.toString());

         const result = messageSchema.safeParse(parsedData);

         if (!result.success) {
            ws.send(JSON.stringify({ error: "Invalid message format" }));
            return;
         }

         const { message, recipient } = result.data;

         const newMessageId = await sentMessageToUser(
            ws.userId as string,
            recipient,
            message
         );

         wsServer.clients.forEach(async client => {
            const extendedClient = client as ExtendedWebSocket;

            if (
               extendedClient.readyState === WebSocket.OPEN &&
               (extendedClient.userId === recipient ||
                  extendedClient.userId === (ws.userId as string))
            ) {
               const isUserOwner =
                  extendedClient.userId === (ws.userId as string);

               const wsUserData = await userDataQuery(ws.userId as string);
               const recipientUserData = await userDataQuery(recipient);

               extendedClient.send(
                  JSON.stringify({
                     id: newMessageId,
                     message,
                     createdAt: new Date(),
                     creatorId: isUserOwner
                        ? wsUserData?.id
                        : recipientUserData?.id,
                     receiverId: isUserOwner
                        ? recipientUserData?.id
                        : wsUserData?.id,
                     type: isUserOwner ? "sent" : "received",
                     sendingUserUsername: !isUserOwner
                        ? wsUserData?.username
                        : recipientUserData?.username,
                  })
               );
            }
         });
      } catch (error) {
         console.error("Failed to parse message data:", error);
         ws.send(JSON.stringify({ error: "Failed to parse message data" }));
      }
   });

   ws.on("close", async () => {
      const stateIsUpdated = await updateOnlineState(
         ws.userId as string,
         false
      );

      if (stateIsUpdated) sendUpdateMessage(wsServer);
   });

   ws.onerror = error => {
      console.error("WebSocket error:", error);
   };
});
