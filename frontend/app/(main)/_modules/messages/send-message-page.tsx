"use client";

import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import { cn } from "@/_utils/cn";
import { SendMessageForm } from "./send-message-form";
import { useState } from "react";
import type { Message } from "@/(main)/_schemas/message.schema";
import { useWebSocket } from "@/(main)/_hooks/use-web-socket";

interface SendMessagePageProps {
   initialMessages: Array<Message>;
   userData: {
      email: string;
      isOnline: boolean;
      username: string;
      userId: string;
   };
}

export const SendMessagePage = ({
   initialMessages,
   userData,
}: SendMessagePageProps) => {
   const [messages, setMessages] = useState(initialMessages);

   const { sendMessage } = useWebSocket({ setMessages });

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
            {messages.map(({ id, message, type }) => (
               <div
                  key={id}
                  className={`${cn(
                     "flex items-end space-x-2",
                     type === "sent" && "justify-end"
                  )}`}
               >
                  <Avatar>
                     <AvatarImage
                        alt="User 1"
                        src="/placeholder.svg?height=40&width=40"
                     />
                  </Avatar>
                  <div
                     className={`${cn(
                        "rounded-lg bg-blue-600 p-3",
                        type === "sent" && "bg-gray-800"
                     )}`}
                  >
                     <p className="text-sm">{message}</p>
                  </div>
               </div>
            ))}
         </div>
         <SendMessageForm onSendMessage={sendMessage} />
      </>
   );
};
