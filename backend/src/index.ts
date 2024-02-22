import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userAuthRoutes from "./routes/userAuthRoutes";
import messageRoutes from "./routes/messagesRoutes";
import { wsServer } from "./ws";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3001;

app.use(
   cors({
      origin: "http://localhost:3000",
      credentials: true,
   })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(userAuthRoutes);
app.use(messageRoutes);

server.on("upgrade", (req, socket, head) => {
   wsServer.handleUpgrade(req, socket, head, ws => {
      wsServer.emit("connection", ws, req);
   });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
