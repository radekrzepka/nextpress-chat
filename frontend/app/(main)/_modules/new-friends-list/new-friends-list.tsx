import { getNewContacts } from "@/(main)/_api/get-new-contacts";
import { Avatar, AvatarImage } from "@/_components/ui/avatar";
import Link from "next/link";

export const NewFriendsList = async () => {
   const newContacts = await getNewContacts();

   return (
      <nav className="divide-y divide-gray-800">
         <div className="pt-6">
            <h1 className="mb-6 text-xl font-bold">Find your new contracts</h1>
            <ul className="mt-4 space-y-4">
               {newContacts.map(contact => (
                  <li key={contact.id} className="flex flex-col">
                     <div className="flex items-center space-x-3">
                        <Avatar>
                           <AvatarImage
                              alt={`Avatar of ${contact.username}`}
                              src={
                                 contact.avatar
                                    ? `/avatars/Avatar${contact.avatar}.svg`
                                    : "/placeholder.svg?height=40&width=40"
                              }
                           />
                        </Avatar>
                        <div>
                           <Link
                              className="font-medium"
                              href={`/${contact.id}`}
                           >
                              {contact.username}
                           </Link>
                           <p
                              className={`text-xs ${contact.isOnline ? "text-green-400" : "text-red-400"}`}
                           >
                              {contact.isOnline ? "Online" : "Offline"}
                           </p>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </nav>
   );
};
