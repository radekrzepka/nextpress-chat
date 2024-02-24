import type { Message as MessageType } from "@/(main)/_schemas/message.schema";
import { AvatarImage } from "@/_components/ui/avatar";
import { cn } from "@/_utils/cn";
import { Avatar } from "@radix-ui/react-avatar";

interface MessageProps {
   message: MessageType;
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

export const Message = ({
   message,
   userData,
   currentUserData,
}: MessageProps) => {
   const owner = message.type === "sent" ? currentUserData : userData;

   return (
      <div
         key={message.id}
         className={`${cn(
            "flex items-end space-x-2",
            message.type === "sent" && "justify-end"
         )}`}
      >
         <Avatar className="size-12">
            <AvatarImage
               alt="User 1"
               src={
                  owner.avatar
                     ? `/avatars/Avatar${owner.avatar}.svg`
                     : "/placeholder.svg?height=40&width=40"
               }
            />
         </Avatar>
         <div
            className={`${cn(
               "max-w-xs rounded-lg p-3 sm:max-w-sm md:max-w-md lg:max-w-lg",
               message.type === "sent" ? "bg-gray-800" : "bg-blue-600"
            )}`}
         >
            <p className="break-words text-sm">{message.message}</p>
         </div>
      </div>
   );
};
