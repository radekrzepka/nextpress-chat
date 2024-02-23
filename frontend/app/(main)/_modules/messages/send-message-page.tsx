"use client";

import { SendMessageForm } from "./send-message-form";
import { useState } from "react";
import type { Message as MessageType } from "@/(main)/_schemas/message.schema";
import { useWebSocket } from "@/(main)/_hooks/use-web-socket";
import { Message } from "./message";

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

   const { sendMessage } = useWebSocket({ setMessages });

   console.log(userData, currentUserData);

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
            {messages.map(message => (
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
