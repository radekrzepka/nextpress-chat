import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { getLastUserMessages } from "@/(main)/_api/get-last-user-messages";
import { getLoggedInUserData } from "@/(main)/_api/get-user-data";
import { ChangeAvatarDialog } from "../change-avatar-dialog/change-avatar-dialog";

export const LastMessagesList = async () => {
   const lastMessages = await getLastUserMessages();
   const { username, avatar } = await getLoggedInUserData();

   return (
      <nav className="divide-y divide-gray-800">
         <div>
            <ChangeAvatarDialog username={username} avatar={avatar} />
            <h2 className="text-xl font-semibold">Your chats</h2>

            <ul className="mt-4 space-y-4">
               {Object.entries(lastMessages).map(
                  ([
                     user,
                     { createdAt, message, userId, type, isOnline, avatar },
                  ]) => (
                     <li className="flex flex-col" key={user}>
                        <div className="flex items-center space-x-3">
                           <Avatar>
                              <AvatarImage
                                 alt={`Avatar of ${user}`}
                                 src={
                                    avatar
                                       ? `/avatars/Avatar${avatar}.svg`
                                       : "/placeholder.svg?height=40&width=40"
                                 }
                              />
                           </Avatar>
                           <div>
                              <Link className="font-medium" href={`/${userId}`}>
                                 {user}
                              </Link>
                              <p className="text-xs text-gray-400">
                                 {formatDistanceToNow(createdAt)} ago
                              </p>
                           </div>
                        </div>
                        <p className="ml-[3.75rem] text-sm text-blue-500">
                           {type === "sent" && "You: "}
                           {message}
                        </p>
                        <p
                           className={`ml-[3.75rem] text-xs ${isOnline ? "text-green-400" : "text-red-400"}`}
                        >
                           {isOnline ? "Online" : "Offline"}
                        </p>
                     </li>
                  )
               )}
            </ul>
         </div>
      </nav>
   );
};
