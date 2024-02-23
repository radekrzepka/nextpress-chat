"use client";

import { useWebSocket } from "@/(main)/_hooks/use-web-socket";

export const MainPage = () => {
   useWebSocket({});

   return (
      <div className="flex h-screen items-center justify-center">
         <div>
            <h1 className="text-center text-xl font-semibold">
               Welcome to nextpress chat app
            </h1>
            <h2 className="text-center text-lg font-medium">
               Select your contact from list
            </h2>
         </div>
      </div>
   );
};
