"use client";

import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import { cn } from "@/_utils/cn";
import { useParams } from "next/navigation";
import { SendMessageForm } from "./send-message-form";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SendMessagePageProps {
   messages: Array<{ type: "sent" | "received"; message: string; id: string }>;
}

export const SendMessagePage = ({
   messages: initialMessages,
}: SendMessagePageProps) => {
   const params = useParams<{ userId: string }>();
   const router = useRouter();

   const [messages, setMessages] = useState(initialMessages);

   const JWT = getCookie("JWT");

   const { sendMessage, lastMessage } = useWebSocket(
      `ws://localhost:3001?token=${JWT}`
   );

   useEffect(() => {
      if (lastMessage !== null) {
         console.log(lastMessage);
         setMessages(prev => prev.concat(JSON.parse(lastMessage.data)));
         router.refresh();
         toast.success("XDD");
      }
   }, [lastMessage, setMessages]);

   return (
      <>
         <div className="flex items-center justify-between pb-4">
            <h2 className="text-2xl font-semibold">
               Chat with {params.userId}
            </h2>
         </div>
         <div className="flex-1 space-y-6 overflow-auto pt-6">
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
