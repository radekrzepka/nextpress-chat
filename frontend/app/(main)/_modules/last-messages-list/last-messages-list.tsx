import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { getLastUserMessages } from "@/(main)/_api/get-last-user-messages";

export const LastMessagesList = async () => {
   const lastMessages = await getLastUserMessages();

   return (
      <nav className="divide-y divide-gray-800">
         <div className="pt-6">
            <h1 className="mb-6 text-2xl font-bold">Nextpress chat</h1>
            <h2 className="text-xl font-semibold">Your chats</h2>
            <ul className="mt-4 space-y-4">
               {Object.entries(lastMessages).map(
                  ([user, { createdAt, message, userId, type }]) => (
                     <li className="flex flex-col" key={user}>
                        <div className="flex items-center space-x-3">
                           <Avatar>
                              <AvatarImage
                                 alt={`Avatar of ${user}`}
                                 src="/placeholder.svg?height=40&width=40"
                              />
                           </Avatar>
                           <div>
                              <Link className="font-medium" href={`/${userId}`}>
                                 {user}
                              </Link>
                              <p className="text-xs text-gray-400">
                                 {formatDistanceToNow(createdAt)}
                              </p>
                           </div>
                        </div>
                        <p className="ml-[3.25rem] text-sm text-green-500">
                           {type === "sent" && "You: "}
                           {message}
                        </p>
                     </li>
                  )
               )}
            </ul>
         </div>
      </nav>
   );
};
