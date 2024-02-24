"use client";

import { SendMessageForm } from "./send-message-form";
import { useEffect, useMemo, useState } from "react";
import {
   newMessageSchema,
   type Message as MessageType,
} from "@/(main)/_schemas/message.schema";
import { Message } from "./message";
import { useParams, useRouter } from "next/navigation";
import {
   scrollToBottom,
   useWebSocketContext,
} from "@/(main)/_hooks/web-socket-context";

interface SendMessagePageProps {
   initialMessages: Array<MessageType>;
   userData: {
      email: string;
      isOnline: boolean;
      username: string;
      userId: string;
      avatar: number | null;
   };
   currentUserData: {
      email: string;
      isOnline: boolean;
      username: string;
      userId: string;
      avatar: number | null;
   };
}

export const SendMessagePage = ({
   initialMessages,
   userData,
   currentUserData,
}: SendMessagePageProps) => {
   const [messages, setMessages] = useState(initialMessages);

   const { lastMessage, sendMessage } = useWebSocketContext();

   const params = useParams();
   const userIdParam = params.userId?.at(0);

   const router = useRouter();

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
               return;
            }

            const parsedMessage = parseResult.data;

            if (
               parsedMessage.type === "sent" ||
               parsedMessage.receiverId === userIdParam
            )
               setMessages(prev => [...prev, parsedMessage]);

            router.refresh();
            scrollToBottom();
         } catch (error) {
            console.error("Failed to parse the message data:", error);
         }
      }
   }, [lastMessage, setMessages, router, userIdParam]);

   useEffect(() => {
      scrollToBottom();
   }, []);

   const filteredMessages = useMemo(() => {
      const seenIds = new Set();
      return messages.filter(message => {
         if (seenIds.has(message.id)) {
            return false;
         }
         seenIds.add(message.id);

         if (
            message.creatorId !== userIdParam &&
            message.receiverId !== userIdParam
         )
            return false;

         return true;
      });
   }, [messages, userIdParam]);

   return (
      <>
         <div className="flex items-center justify-between pb-4">
            <h2 className="text-2xl font-semibold">
               Chat with {userData.username}
            </h2>
         </div>
         <div
            id="message-container"
            className="flex-1 space-y-6 overflow-auto px-3 pt-6"
         >
            {filteredMessages.map(message => (
               <Message
                  message={message}
                  key={message.id}
                  userData={userData}
                  currentUserData={currentUserData}
               />
            ))}
         </div>
         <SendMessageForm onSendMessage={sendMessage} />
      </>
   );
};
