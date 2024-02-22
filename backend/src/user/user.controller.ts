import {
   signIn,
   checkJWT,
   signUp,
   sendForgotPasswordMail,
   validateForgotPasswordToken,
   validateEmailToken,
   updateForgottenPassword,
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
