import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
   signInSchema,
   signUpSchema,
} from "./../../schemas/user/userAuthSchemas";

const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
   const parseReqBody = signUpSchema.safeParse(req.body);
   if (!parseReqBody.success) return res.status(400).json("Invalid request");

   const { email, username, password } = parseReqBody.data;

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

   const newUser = await prisma.user.create({
      data: {
         email,
         username,
         password: hash,
      },
   });

   const token = jwt.sign({ userId: newUser.id }, process.env.PORT as string);

   res.cookie("JWT", token);
   res.json(token);
};

export const signIn = async (req: Request, res: Response) => {
   const parseReqBody = signInSchema.safeParse(req.body);
   if (!parseReqBody.success) return res.status(400).json("Invalid request");

   const { email, password } = parseReqBody.data;

   const user = await prisma.user.findFirst({
      where: {
         email,
      },
   });

   if (!user) {
      return res.status(401).json({ message: "Please provide correct email" });
   }

   if (!user.isEmailAuthenticated) {
      return res.status(401).json({ message: "Email not authenticated" });
   }

   const isPasswordCorrect = bcrypt.compare(password, user.password);

   if (!isPasswordCorrect) {
      return res
         .status(401)
         .json({ message: "Please provide correct password" });
   }

   const token = jwt.sign({ userId: user.id }, process.env.PORT as string);

   res.cookie("JWT", token);
   res.json(token);
};
