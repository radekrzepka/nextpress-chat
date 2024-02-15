import apiFetch from "@/utils/fetch";
import { getJWT } from "@/utils/get-jwt";

export const getLastUserMessages = async () => {
   return await apiFetch<
      Record<
         string,
         {
            message: string;
            createdAt: string;
            userId: string;
            type: "sent" | "received";
         }
      >
   >("/user/last-messages-list", {}, getJWT());
};
