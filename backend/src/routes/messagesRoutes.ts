import {
   getUserMessagesWithAnotherUser,
   getUserLastMessages,
   getNewContacts,
} from "../controllers/messagesControllers";
import { authenticate } from "../middlewares/authenticate";
import express from "express";

const router = express.Router();

router.get("/user/messages/:id", authenticate, getUserMessagesWithAnotherUser);
router.get("/user/last-messages-list", authenticate, getUserLastMessages);
router.get("/user/new-contacts", authenticate, getNewContacts);

export default router;
