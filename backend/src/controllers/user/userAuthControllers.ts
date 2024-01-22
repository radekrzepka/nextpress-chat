import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
   signInSchema,
   signUpSchema,
   forgotPasswordSchema,
   tokenSchema,
   updateForgottenPasswordSchema,
} from "./../../schemas/user/userAuthSchemas";
import crypto from "crypto";
import { sendMail } from "../../services/email-services";

const prisma = new PrismaClient();

export const signIn = async (req: Request, res: Response) => {
   const parsedReqBody = signInSchema.safeParse(req.body);
   if (!parsedReqBody.success) return res.status(400).json("Invalid request");
   const { email, password } = parsedReqBody.data;

   const user = await prisma.user.findFirst({
      where: {
         email,
      },
      include: {
         ConfirmEmailToken: { select: { isTokenAuthenticated: true } },
      },
   });

   if (!user) {
      return res.status(401).json({ message: "Please provide correct email" });
   }

   if (user.ConfirmEmailToken?.isTokenAuthenticated) {
      return res.status(401).json({ message: "Email not authenticated" });
   }

   const isPasswordCorrect = await bcrypt.compare(password, user.password);

   if (!isPasswordCorrect) {
      return res
         .status(401)
         .json({ message: "Please provide correct password" });
   }

   const token = jwt.sign({ userId: user.id }, process.env.PORT as string);

   res.cookie("JWT", token);
   res.json(token);
};

export const signUp = async (req: Request, res: Response) => {
   const parsedReqBody = signUpSchema.safeParse(req.body);
   if (!parsedReqBody.success) return res.status(400).json("Invalid request");
   const { email, username, password } = parsedReqBody.data;

   const existingUser = await prisma.user.findFirst({
      where: {
         OR: [{ email }, { username }],
      },
   });

   if (existingUser?.email === email) {
      return res.status(409).json({ message: "Email already taken" });
   }

   if (existingUser?.username === username) {
      return res.status(409).json({ message: "Username already taken" });
   }

   const hash = bcrypt.hashSync(password, 10);
   const confirmEmailToken = crypto.randomBytes(20).toString("hex");

   const newUser = await prisma.user.create({
      data: {
         email,
         username,
         password: hash,
         ConfirmEmailToken: {
            create: {
               token: confirmEmailToken,
            },
         },
      },
      include: {
         ConfirmEmailToken: {
            select: {
               token: true,
            },
         },
      },
   });

   try {
      await sendMail({
         to: email,
         subject: "Confirm email",
         text: `Thanks for creating account in live chat app. Please go to this link to authenticate your email ${process.env.FRONTEND_URL}/confirm-email/${newUser.ConfirmEmailToken?.token}`,
      });
      res.status(200).json("Email sent successfully");
   } catch (error) {
      console.error(error);
      res.status(500).json("Error during sending email");
   }
};

export const validateEmailToken = async (req: Request, res: Response) => {
   const parsedReqToken = tokenSchema.safeParse(req.params.token);
   console.log(req);
   if (!parsedReqToken.success) return res.status(400).json("Invalid request");
   const token = parsedReqToken.data;

   const foundedToken = await prisma.confirmEmailToken.findUnique({
      where: {
         token,
      },
   });

   if (!foundedToken) {
      return res.status(400).json("Token not founded");
   }

   if (foundedToken.isTokenAuthenticated) {
      return res.status(200).json({
         title: "Account already authenticated",
         description:
            "This account has already been authorized before, you can log in",
      });
   }

   await prisma.confirmEmailToken.update({
      where: {
         token: foundedToken.token,
      },
      data: {
         isTokenAuthenticated: true,
      },
   });

   res.status(200).json({
      title: "Account authenticated successfully",
      description:
         "You have successfully authenticated your account, you can log in",
   });
};

export const sendForgotPasswordMail = async (req: Request, res: Response) => {
   const parsedReqBody = forgotPasswordSchema.safeParse(req.body);
   if (!parsedReqBody.success) return res.status(400).json("Invalid request");
   const { email } = parsedReqBody.data;

   const user = await prisma.user.findUnique({ where: { email } });

   if (!user) {
      return res.status(400).json("User not found");
   }

   const token = crypto.randomBytes(20).toString("hex");

   const expiresDate = new Date();
   expiresDate.setMinutes(expiresDate.getMinutes() + 15);

   await prisma.passwordForgotToken.create({
      data: {
         token: token,
         expiresDate: expiresDate,
         userId: user.id,
      },
   });

   try {
      await sendMail({
         to: email,
         subject: "Forgot Password",
         text: `Your password reset link is ${process.env.FRONTEND_URL}/forgot-password/${token}`,
      });
      res.status(200).json("Email sent successfully");
   } catch (error) {
      console.error(error);
      res.status(500).json("Error during sending email");
   }
};

export const validateForgotPasswordToken = async (
   req: Request,
   res: Response
) => {
   const parsedReqToken = tokenSchema.safeParse(req.params.token);
   if (!parsedReqToken.success) return res.status(400).json("Invalid request");
   const token = parsedReqToken.data;

   const foundedToken = await prisma.passwordForgotToken.findUnique({
      where: {
         token,
         expiresDate: {
            gte: new Date(),
         },
         isTokenUsed: false,
      },
   });

   if (!foundedToken) {
      return res.status(400).json("Token not founded");
   }

   res.status(200).json("Token founded successfully");
};

export const updateForgottenPassword = async (req: Request, res: Response) => {
   const parsedReqToken = tokenSchema.safeParse(req.params.token);
   if (!parsedReqToken.success) return res.status(400).json("Invalid request");
   const token = parsedReqToken.data;

   const parsedReqBody = updateForgottenPasswordSchema.safeParse(req.body);
   if (!parsedReqBody.success) return res.status(400).json("Invalid request");
   const { newPassword } = parsedReqBody.data;

   const hash = bcrypt.hashSync(newPassword, 10);

   const updatingUser = await prisma.user.findFirst({
      where: {
         PasswordForgotToken: {
            some: {
               token,
            },
         },
      },
   });

   if (!updatingUser) return res.status(400).json("Invalid request");

   await prisma.user.update({
      where: {
         id: updatingUser.id,
      },
      data: {
         password: hash,
      },
   });

   res.status(200).json("Password updated successfully");
};
