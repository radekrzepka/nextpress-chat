import React, { useState } from "react";
import { Button } from "@/_components/ui/button";
import { useParams } from "next/navigation";

export interface SendMessageFormProps {
   onSendMessage: any;
}

export const SendMessageForm = ({ onSendMessage }: SendMessageFormProps) => {
   const [message, setMessage] = useState("");
   const params = useParams<{ userId: Array<string> }>();

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault(); // Prevent the form from causing a page reload
      if (message.trim()) {
         onSendMessage(
            JSON.stringify({ message, recipient: params.userId.at(0) })
         );
      }
   };

   return (
      <form onSubmit={handleSubmit} className="flex space-x-3 pt-6">
         <input
            className="flex-1 rounded-lg bg-white p-3 text-black"
            placeholder="Write a message..."
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
         />
         <Button
            type="submit"
            className="w-20 rounded-lg bg-blue-600 py-6 text-white transition-colors duration-200 hover:bg-blue-500"
         >
            Send
         </Button>
      </form>
   );
};
