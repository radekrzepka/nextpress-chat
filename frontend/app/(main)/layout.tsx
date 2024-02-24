import { LogOutButton } from "../_components/ui/log-out-button";
import { WebSocketProvider } from "./_hooks/web-socket-context";
import { LastMessagesList } from "./_modules/last-messages-list/last-messages-list";
import { NewFriendsList } from "./_modules/new-friends-list/new-friends-list";

import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
   return (
      <WebSocketProvider>
         <div className="flex h-screen w-full bg-gray-900 text-white">
            <aside className="flex w-80 flex-col overflow-auto border-r border-gray-800 pr-6">
               <div className="flex-1">
                  <LastMessagesList />
                  <NewFriendsList />
               </div>
               <LogOutButton />
            </aside>
            <main className="flex flex-1 flex-col p-6">{children}</main>
         </div>
      </WebSocketProvider>
   );
};

export default Layout;
