import { apiFetch } from "@/_utils/fetch";
import { getJWT } from "@/_utils/get-jwt";

export const getNewContacts = async () => {
   return await apiFetch<
      Array<{
         id: string;
         username: string;
         isOnline: boolean;
         avatar: number | null;
      }>
   >("/user/new-contacts", {}, getJWT());
};
