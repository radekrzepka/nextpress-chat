import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import apiFetch from "./utils/fetch";

const isUserLogIn = async (req: NextRequest) => {
   const isJwtCookie = req.cookies.get("JWT")?.value;
   if (!isJwtCookie) {
      return false;
   }

   try {
      const status = await apiFetch<string>(
         "/user/check",
         {},
         req.cookies.get("JWT")?.value
      );
      return status === "Authenticated";
   } catch {
      return false;
   }
};

export async function middleware(req: NextRequest) {
   const userLogIn = await isUserLogIn(req);
   const requestPath = req.nextUrl.pathname;

   if (userLogIn && requestPath !== "/") {
      return NextResponse.redirect(new URL("/", process.env.URL as string));
   }

   if (!userLogIn && requestPath === "/") {
      return NextResponse.redirect(`${process.env.URL}/sign-in`);
   }
}

export const config = {
   matcher: ["/sign-in", "/sign-up", "/"],
};
