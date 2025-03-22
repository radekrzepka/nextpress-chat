import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { messageSchema, userIdSchema } from "./messages.schemas";

const prisma = new PrismaClient();

export const getUserMessagesWithAnotherUser = async (
   req: Request,
   res: Response
) => {
   const parsedReqParams = userIdSchema.safeParse(req.params.id);
   if (!parsedReqParams.success) return res.status(400).json("Invalid request");
   const userId = parsedReqParams.data;

   const { id: loggedUserId } = req.user;

   try {
      const usersMessages = await prisma.message.findMany({
         where: {
            OR: [
               { AND: [{ creatorId: loggedUserId }, { receiverId: userId }] },
               { AND: [{ creatorId: userId }, { receiverId: loggedUserId }] },
            ],
         },
         orderBy: {
            createdAt: "asc",
         },
         select: {
            id: true,
            message: true,
            createdAt: true,
            creatorId: true,
            receiverId: true,
         },
      });

      const mappedMessages = usersMessages.map(msg => ({
         ...msg,
         type: msg.creatorId === loggedUserId ? "sent" : "received",
      }));

      res.status(200).json(mappedMessages);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
   }
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
            receiver: {
               select: {
                  username: true,
                  id: true,
                  isOnline: true,
                  avatar: true,
               },
            },
            createdAt: true,
            creator: {
               select: {
                  username: true,
                  id: true,
                  isOnline: true,
                  avatar: true,
               },
            },
         },
      });

      const lastMessages = new Map<
         string,
         {
            message: string;
            createdAt: Date;
            userId: string;
            type: "sent" | "received";
            isOnline: boolean;
            avatar: number | null;
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
               isOnline: anotherUser.isOnline,
               avatar: anotherUser.avatar,
            });
         }
      }

      res.status(200).json(Object.fromEntries(lastMessages));
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
   }
};

export const getNewContacts = async (req: Request, res: Response) => {
   const { id: loggedUserId } = req.user;

   try {
      const usersWithMessages = await prisma.message.findMany({
         where: {
            OR: [{ creatorId: loggedUserId }, { receiverId: loggedUserId }],
         },
         select: {
            creatorId: true,
            receiverId: true,
         },
      });

      const contactedUserIds = new Set(
         usersWithMessages.flatMap(msg => [msg.creatorId, msg.receiverId])
      );

      contactedUserIds.add(loggedUserId);

      const newContacts = await prisma.user.findMany({
         where: {
            ConfirmEmailToken: {
               isTokenAuthenticated: true,
            },
            NOT: {
               id: {
                  in: [...contactedUserIds],
               },
            },
         },
         select: {
            id: true,
            username: true,
            isOnline: true,
            avatar: true,
         },
      });

      res.status(200).json(newContacts);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
   }
};

export const sentMessageToUser = async (req: Request, res: Response) => {
   const { id: loggedUserId } = req.user;

   const parsedReqParams = userIdSchema.safeParse(req.params.id);
   if (!parsedReqParams.success) return res.status(400).json("Invalid request");
   const userId = parsedReqParams.data;

   const parsedReqBody = messageSchema.safeParse(req.body);
   if (!parsedReqBody.success) return res.status(400).json("Invalid request");
   const message = parsedReqBody.data;

   try {
      await prisma.message.create({
         data: {
            message,
            receiverId: userId,
            creatorId: loggedUserId,
         },
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
   }
};
