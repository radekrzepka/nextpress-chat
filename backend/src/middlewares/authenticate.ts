import type { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import type { IncomingMessage } from "http";

const prisma = new PrismaClient();

export const authenticate = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const JWT = req.headers.authorization;

   if (!JWT) {
      return res.status(401).json({ message: "No token provided" });
   }

   try {
      const decoded = jwt.verify(
         JWT,
         process.env.JWT_SECRET_KEY as string
      ) as jwt.JwtPayload;
      const userId = decoded.userId as string;

      const loggedUser = await prisma.user.findUnique({
         where: {
            id: userId,
         },
      });

      if (!loggedUser) {
         return res.status(404).json({ message: "User not found" });
      }

      req.user = loggedUser;
      next();
   } catch (error) {
      res.status(401).json({ message: "Invalid token" });
   }
};

export const authenticateWebSocket = async (request: IncomingMessage) => {
   const url = new URL(request.url || "", `http://${request.headers.host}`);
   const token = url.searchParams.get("token");

   if (!token) {
      throw new Error("No token provided");
   }

   try {
      const decoded = jwt.verify(
         token,
         process.env.JWT_SECRET_KEY as string
      ) as jwt.JwtPayload;
      const userId = decoded.userId as string;

      const user = await prisma.user.findUnique({
         where: {
            id: userId,
         },
      });

      if (!user) {
         throw new Error("User not found");
      }

      return user;
   } catch (error) {
      throw new Error("Invalid token");
   }
};
