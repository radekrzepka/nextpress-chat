import type { Express } from "express";
import express from "express";
import userAuthRoutes from "./routes/user/userAuthRoutes";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app: Express = express();
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

app.listen(port);
