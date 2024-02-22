import type { Prisma } from "@prisma/client";

import { WebSocket as OriginalWebSocket } from "ws";

declare global {
   namespace WebSocket {
      user: Prisma.UserWhereUniqueInput;
   }

   namespace Express {
      interface Request {
         cookies: { JWT?: string };
         user: Prisma.UserWhereUniqueInput;
      }
   }
}
