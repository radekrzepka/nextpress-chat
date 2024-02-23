import { authenticate } from "../middlewares/authenticate";
import {
   signIn,
   checkJWT,
   signUp,
   sendForgotPasswordMail,
   validateForgotPasswordToken,
   validateEmailToken,
   updateForgottenPassword,
   getLoggedUserData,
   getUserDataById,
   updateAvatar,
} from "./user.services";
import express from "express";

export const userRouter = express.Router();

userRouter.post("/user/sign-in", signIn);
userRouter.get("/user/check", checkJWT);

userRouter.post("/user/sign-up", signUp);
userRouter.get("/user/sign-up/validate-email/:token", validateEmailToken);

userRouter.post("/user/forgot-password", sendForgotPasswordMail);
userRouter.get(
   "/user/forgot-password/validate/:token",
   validateForgotPasswordToken
);
userRouter.patch(
   "/user/forgot-password/update/:token",
   updateForgottenPassword
);

userRouter.get("/user", authenticate, getLoggedUserData);
userRouter.get("/user/get-data/:id", getUserDataById);
userRouter.patch("/user/update-avatar/:avatarId", authenticate, updateAvatar);
