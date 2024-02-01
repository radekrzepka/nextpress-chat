import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface LastMessagesListProps {}

const LastMessagesList = ({}: LastMessagesListProps) => {
   return (
      <nav className="divide-y divide-gray-800">
         <div className="pt-6">
            <h1 className="mb-6 text-2xl font-bold">Nextpress chat</h1>
            <h2 className="text-xl font-semibold">Your chats</h2>
            <ul className="mt-4 space-y-4">
               <li className="flex flex-col">
                  <div className="flex items-center space-x-3">
                     <Avatar>
                        <AvatarImage
                           alt="User 1"
                           src="/placeholder.svg?height=40&width=40"
                        />
                     </Avatar>
                     <div>
                        <Link className="font-medium" href="/1">
                           User 1
                        </Link>
                        <p className="text-xs text-gray-400">10 min ago</p>
                     </div>
                  </div>
                  <p className="ml-[3.25rem] text-sm text-green-500">
                     Hey, what&apos;s up?
                  </p>
               </li>
               <li className="flex flex-col">
                  <div className="flex items-center space-x-3">
                     <Avatar>
                        <AvatarImage
                           alt="User 2"
                           src="/placeholder.svg?height=40&width=40"
                        />
                     </Avatar>
                     <div>
                        <Link className="font-medium" href="/2">
                           User 2
                        </Link>
                        <p className="text-xs text-gray-400">2 hours ago</p>
                     </div>
                  </div>
                  <p className="ml-[3.25rem] text-sm text-blue-500">
                     See you soon!
                  </p>
               </li>
               <li className="flex flex-col">
                  <div className="flex items-center space-x-3">
                     <Avatar>
                        <AvatarImage
                           alt="User 3"
                           src="/placeholder.svg?height=40&width=40"
                        />
                     </Avatar>
                     <div>
                        <Link className="font-medium" href="/3">
                           User 3
                        </Link>
                        <p className="text-xs text-gray-400">3 hours ago</p>
                     </div>
                  </div>
                  <p className="ml-[3.25rem] text-sm text-blue-500">
                     Great meeting!
                  </p>
               </li>
            </ul>
         </div>
      </nav>
   );
};

export default LastMessagesList;
