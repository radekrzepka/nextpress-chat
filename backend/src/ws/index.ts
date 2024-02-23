import WebSocket, { WebSocketServer } from "ws";
import type { ExtendedWebSocket } from "./ws-services";
import {
   authenticateWebSocket,
   messageSchema,
   sentMessageToUser,
} from "./ws-services";

export const wsServer = new WebSocketServer({ noServer: true });

wsServer.on("connection", (ws: ExtendedWebSocket, req) => {
   const params = new URLSearchParams(req.url?.substring(req.url.indexOf("?")));
   const token = params.get("token");

   console.log(token);

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
   ws.on("message", async data => {
      try {
         // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-base-to-string
         const parsedData = JSON.parse(data.toString());

         const result = messageSchema.safeParse(parsedData);
         console.log(parsedData, result);

         if (!result.success) {
            ws.send(JSON.stringify({ error: "Invalid message format" }));
            return;
         }

         const { message, recipient } = result.data;

         console.log({ dupa: ws.userId as string, recipient, message });

         await sentMessageToUser(ws.userId as string, recipient, message);

         wsServer.clients.forEach(client => {
            const extendedClient = client as ExtendedWebSocket;

            if (
               extendedClient.readyState === WebSocket.OPEN &&
               (extendedClient.userId === recipient ||
                  extendedClient.userId === (ws.userId as string))
            ) {
               const isUserOwner =
                  extendedClient.userId === (ws.userId as string);

               extendedClient.send(
                  JSON.stringify({
                     type: isUserOwner ? "sent" : "received",
                     id: "XDDDDDDDDDDDDDDd",
                     message,
                  })
               );
            }
         });
      } catch (error) {
         console.error("Failed to parse message data:", error);
         ws.send(JSON.stringify({ error: "Failed to parse message data" }));
      }
   });

   ws.on("close", () => console.log("Client has disconnected!"));

   ws.onerror = error => {
      console.error("WebSocket error:", error);
   };
});
