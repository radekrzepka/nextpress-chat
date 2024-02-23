import { apiFetch } from "../../_utils/fetch";
import { getJWT } from "../../_utils/get-jwt";

export const getLastUserMessages = async () => {
   return await apiFetch<
      Record<
         string,
         {
            message: string;
            createdAt: string;
            userId: string;
            type: "sent" | "received";
            isOnline: boolean;
            avatar: number | null;
         }
      >
   >("/user/last-messages-list", {}, getJWT());
};
