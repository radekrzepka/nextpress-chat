import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface NewFriendsListProps {}

const NewFriendsList = ({}: NewFriendsListProps) => {
   return (
      <nav className="divide-y divide-gray-800">
         <div className="pt-6">
            <h1 className="mb-6 text-xl font-bold">Find your new contracts</h1>
            <ul className="mt-4 space-y-4">
               <li className="flex flex-col">
                  <div className="flex items-center space-x-3">
                     <Avatar>
                        <AvatarImage
                           alt="Group 1"
                           src="/placeholder.svg?height=40&width=40"
                        />
                     </Avatar>
                     <div>
                        <Link className="font-medium" href="/1">
                           User 1
                        </Link>
                        <p className="text-xs text-green-400">Online</p>
                     </div>
                  </div>
               </li>
               <li className="flex flex-col">
                  <div className="flex items-center space-x-3">
                     <Avatar>
                        <AvatarImage
                           alt="Group 1"
                           src="/placeholder.svg?height=40&width=40"
                        />
                     </Avatar>
                     <div>
                        <Link className="font-medium" href="/2">
                           User 2
                        </Link>
                        <p className="text-xs text-green-400">Online</p>
                     </div>
                  </div>
               </li>
               <li className="flex flex-col">
                  <div className="flex items-center space-x-3">
                     <Avatar>
                        <AvatarImage
                           alt="Group 1"
                           src="/placeholder.svg?height=40&width=40"
                        />
                     </Avatar>
                     <div>
                        <Link className="font-medium" href="/3">
                           User 3
                        </Link>
                        <p className="text-xs text-red-400">Offline</p>
                     </div>
                  </div>
               </li>
            </ul>
         </div>
      </nav>
   );
};

export default NewFriendsList;
