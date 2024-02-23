"use client";

import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";
import useWebSocketBase from "react-use-websocket";
import type { Message } from "../_schemas/message.schema";
import { newMessageSchema } from "../_schemas/message.schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCookie } from "cookies-next";

const scrollToBottom = () => {
   const element = document.getElementById("message-container");
   if (element) {
      element.scrollTop = element.scrollHeight;
   }
};

export const useWebSocket = ({
   setMessages,
}: {
   setMessages?: Dispatch<SetStateAction<Array<Message>>>;
}) => {
   const JWT = getCookie("JWT");

   const { sendMessage, lastMessage } = useWebSocketBase(
      `${process.env.NEXT_PUBLIC_WS_SERVER_URL}?token=${JWT}`
   );

   const router = useRouter();

   const notificationSound = new Audio("/message-sound-effect.mp3");

   useEffect(() => {
      const container = document.getElementById("message-container");
      if (!container) return;

      const observer = new MutationObserver(scrollToBottom);
      observer.observe(container, { childList: true });

      return () => observer.disconnect();
   }, []);

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

            setMessages && setMessages(prev => prev.concat(parsedMessage));
            router.refresh();
            scrollToBottom();

            if (parsedMessage.type === "received") {
               toast.info(
                  `${parsedMessage.username} sent you message: ${parsedMessage.message}`,
                  {
                     position: "top-right",
                  }
               );

               notificationSound.play();
            }
         } catch (error) {
            console.error("Failed to parse the message data:", error);
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [lastMessage, setMessages, router]);

   useEffect(() => {
      scrollToBottom();
   }, []);

   return { sendMessage };
};
