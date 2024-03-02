"use client";

import React, { createContext, useContext, useEffect } from "react";
import type { SendMessage } from "react-use-websocket";
import useWebSocketBase from "react-use-websocket";
import { getCookie } from "cookies-next";
import { newMessageSchema } from "../_schemas/message.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const scrollToBottom = () => {
   const element = document.getElementById("message-container");
   if (element) {
      element.scrollTop = element.scrollHeight;
   }
};

type WebSocketContextType = {
   sendMessage: SendMessage;
   lastMessage: MessageEvent<unknown> | null;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocketContext = () => {
   const context = useContext(WebSocketContext);
   if (context === null) {
      throw new Error(
         "useWebSocketContext must be used within a WebSocketProvider"
      );
   }
   return context;
};

export const WebSocketProvider = ({
   children,
}: {
   children: React.ReactNode;
}) => {
   const JWT = getCookie("JWT");
   const { sendMessage, lastMessage } = useWebSocketBase(
      `${process.env.NEXT_PUBLIC_WS_SERVER_URL}?token=${JWT}`
   );
   const router = useRouter();

   useEffect(() => {
      if (lastMessage !== null) {
         try {
            const parseResult = newMessageSchema.safeParse(
               JSON.parse(lastMessage.data as string)
            );

            if (!parseResult.success) {
               router.refresh();
               return;
            }

            const parsedMessage = parseResult.data;

            router.refresh();
            scrollToBottom();
            if (parsedMessage.type === "received") {
               toast.info(
                  `${parsedMessage.sendingUserUsername} sent you message: ${parsedMessage.message}`,
                  {
                     position: "top-right",
                  }
               );
            }
         } catch (error) {
            console.error("Failed to parse the message data:", error);
         }
      }
   }, [lastMessage, router]);

   useEffect(() => {
      scrollToBottom();
   }, []);

   const value = { sendMessage, lastMessage };

   return (
      <WebSocketContext.Provider value={value}>
         {children}
      </WebSocketContext.Provider>
   );
};
