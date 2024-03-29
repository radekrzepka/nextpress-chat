"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export const LogOutButton = () => {
   const router = useRouter();
   return (
      <Button
         onClick={() => {
            deleteCookie("JWT");
            router.push("/sign-in");
         }}
         className="mb-6 w-full self-end bg-blue-600 py-6 text-white transition-colors duration-200 hover:bg-blue-500"
      >
         Log out
      </Button>
   );
};
