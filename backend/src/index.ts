import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { userRouter } from "./user/user.controller";
import { messagesRouter } from "./messages/messages.controller";
import { wsServer } from "./ws";
import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
   windowMs: 60 * 1000,
   limit: 100,
   standardHeaders: "draft-7",
   legacyHeaders: false,
});

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

app.use(
   cors({
      origin: ["http://localhost:3000", "https://nextpress-chat.vercel.app"],
      credentials: true,
   })
);
app.use(express.json());
app.use(cookieParser());
app.use(limiter);
app.use(bodyParser.json());
app.use(userRouter);
app.use(messagesRouter);

server.on("upgrade", (req, socket, head) => {
   wsServer.handleUpgrade(req, socket, head, ws => {
      wsServer.emit("connection", ws, req);
   });
});

server.listen(port);
