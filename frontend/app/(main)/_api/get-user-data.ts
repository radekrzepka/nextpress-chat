import { apiFetch } from "@/_utils/fetch";
import { getJWT } from "@/_utils/get-jwt";

export const getLoggedInUserData = async () => {
   return await apiFetch<{
      email: string;
      isOnline: boolean;
      username: string;
      userId: string;
      avatar: number | null;
   }>("/user", {}, getJWT());
};

export const getUserDataById = async (userId: string) => {
   return await apiFetch<{
      email: string;
      isOnline: boolean;
      username: string;
      userId: string;
      avatar: number | null;
   }>(`/user/get-data/${userId}`, {}, getJWT());
};
