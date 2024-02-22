import { z } from "zod";

export const userIdSchema = z.string().min(1);
export const messageSchema = z.string().min(1);
