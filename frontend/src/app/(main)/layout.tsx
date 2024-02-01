"use client";

import { Button } from "@/components/ui/button";
import LastMessagesList from "@/modules/last-messages-list/last-messages-list";
import NewFriendsList from "@/modules/new-friends-list/new-friends-list";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
   const router = useRouter();

   return (
      <div className="flex h-screen w-full bg-gray-900 text-white">
         <aside className="flex w-80 flex-col overflow-auto border-r border-gray-800 pr-6">
            <div className="flex-1">
               <LastMessagesList />
               <NewFriendsList />
            </div>
            <Button
               onClick={() => {
                  deleteCookie("JWT");
                  router.push("/sign-in");
               }}
               className="mb-6 w-full self-end bg-blue-600 text-white transition-colors duration-200 hover:bg-blue-500"
            >
               Log out
            </Button>
         </aside>
         <main className="flex flex-1 flex-col p-6">{children}</main>
      </div>
   );
};

export default Layout;
