import { apiFetch } from "@/_utils/fetch";
import { getJWT } from "@/_utils/get-jwt";

export const getNewContacts = async () => {
   return await apiFetch<
      Array<{ id: string; username: string; isOnline: boolean }>
   >("/user/new-contacts", {}, getJWT());
};
