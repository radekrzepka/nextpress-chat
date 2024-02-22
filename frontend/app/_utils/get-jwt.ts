import { cookies } from "next/headers";

export const getJWT = () => {
   const cookiesStore = cookies();
   return cookiesStore.get("JWT")?.value;
};
