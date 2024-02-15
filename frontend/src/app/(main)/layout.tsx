import { getLastUserMessages } from "@/api/get-last-user-messages";
import LogOutButton from "@/components/ui/log-out-button";
import LastMessagesList from "@/modules/last-messages-list/last-messages-list";
import NewFriendsList from "@/modules/new-friends-list/new-friends-list";

import type { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
   const lastMessages = await getLastUserMessages();

   return (
      <div className="flex h-screen w-full bg-gray-900 text-white">
         <aside className="flex w-80 flex-col overflow-auto border-r border-gray-800 pr-6">
            <div className="flex-1">
               <LastMessagesList lastMessages={lastMessages} />
               <NewFriendsList />
            </div>
            <LogOutButton />
         </aside>
         <main className="flex flex-1 flex-col p-6">{children}</main>
      </div>
   );
};

export default Layout;
