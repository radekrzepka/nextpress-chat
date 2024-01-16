import { signIn, signUp } from "../../controllers/user/userAuthControllers";
import express from "express";

const router = express.Router();

router.post("/user/sign-up", signUp);
router.post("/user/sign-in", signIn);

export default router;
