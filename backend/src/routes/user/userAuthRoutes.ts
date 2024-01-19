import {
   signIn,
   signUp,
   sendForgotPasswordMail,
   validateForgotPasswordToken,
   validateEmailToken,
   updateForgottenPassword,
} from "../../controllers/user/userAuthControllers";
import express from "express";

const router = express.Router();

router.post("/user/sign-in", signIn);

router.post("/user/sign-up", signUp);
router.get("/user/sign-up/validate-email/:token", validateEmailToken);

router.post("/user/forgot-password", sendForgotPasswordMail);
router.get(
   "/user/forgot-password/validate/:token",
   validateForgotPasswordToken
);
router.patch("/user/forgot-password/update/:token", updateForgottenPassword);

export default router;
