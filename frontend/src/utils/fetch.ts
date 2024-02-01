import { getCookie } from "cookies-next";
import type { ApiError } from "@/types/api-error";
import type { NextRequest } from "next/server";

const apiFetch = async <T>(
   endpoint: string,
   options: RequestInit = {},
   req?: NextRequest
): Promise<T> => {
   const baseUrl = process.env.NEXT_PUBLIC_API_URL;
   const jwtToken = req ? req.cookies.get("JWT")?.value : getCookie("JWT");

   const headers: HeadersInit = new Headers({
      "Content-Type": "application/json",
      credentials: "include",
      ...options.headers,
   });

   if (jwtToken) {
      headers.set("Authorization", jwtToken);
   }

   try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
         ...options,
         headers,
         credentials: "include",
         cache: "no-store",
      });

      if (!response.ok) {
         const errorBody = (await response.json()) as Partial<ApiError>;
         const error: ApiError = {
            message: errorBody.message || "An error occurred",
            statusCode: errorBody.statusCode || response.status,
         };

         throw Object.assign(new Error(error.message), {
            statusCode: error.statusCode,
         });
      }

      const data = (await response.json()) as T;
      return data;
   } catch (error) {
      throw error;
   }
};

export default apiFetch;
