import type { Prisma } from "@prisma/client";

declare global {
   namespace Express {
      interface Request {
         cookies: { JWT?: string };
         user: Prisma.UserWhereUniqueInput;
      }
   }
}
