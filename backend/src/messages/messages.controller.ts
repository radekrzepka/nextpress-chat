import {
   getUserMessagesWithAnotherUser,
   getUserLastMessages,
   getNewContacts,
} from "./messages.services";
import { authenticate } from "../middlewares/authenticate";
import express from "express";

export const messagesRouter = express.Router();

messagesRouter.get(
   "/user/messages/:id",
   authenticate,
   getUserMessagesWithAnotherUser
);
messagesRouter.get(
   "/user/last-messages-list",
   authenticate,
   getUserLastMessages
);
messagesRouter.get("/user/new-contacts", authenticate, getNewContacts);
