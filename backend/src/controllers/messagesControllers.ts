import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUserMessagesWithAnotherUser = (req: Request, res: Response) => {
   res.status(200).json("XD");
};

export const getUserLastMessages = async (req: Request, res: Response) => {
   const { id: loggedUserId, username: loggedUserUsername } = req.user;

   try {
      const allUserMessages = await prisma.message.findMany({
         where: {
            OR: [{ creatorId: loggedUserId }, { receiverId: loggedUserId }],
         },
         orderBy: {
            createdAt: "desc",
         },
         select: {
            message: true,
            receiver: { select: { username: true, id: true } },
            createdAt: true,
            creator: { select: { username: true, id: true } },
         },
      });

      const lastMessages = new Map<
         string,
         {
            message: string;
            createdAt: Date;
            userId: string;
            type: "sent" | "received";
         }
      >();

      for (const message of allUserMessages) {
         const isUserCreator = loggedUserUsername === message.creator.username;
         const anotherUser = isUserCreator ? message.receiver : message.creator;

         const existingMessage = lastMessages.get(anotherUser.username);
         if (
            !existingMessage ||
            existingMessage.createdAt < message.createdAt
         ) {
            lastMessages.set(anotherUser.username, {
               message: message.message,
               createdAt: message.createdAt,
               userId: anotherUser.id,
               type: isUserCreator ? "sent" : "received",
            });
         }
      }

      console.log(Object.fromEntries(lastMessages));

      res.status(200).json(Object.fromEntries(lastMessages));
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
   }
};

export const getNewContacts = (req: Request, res: Response) => {
   const { id: loggedUserId, username: loggedUserUsername } = req.user;
};
