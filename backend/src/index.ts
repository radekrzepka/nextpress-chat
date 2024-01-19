import type { Express } from "express";
import express from "express";
import userAuthRoutes from "./routes/user/userAuthRoutes";
import cors from "cors";
import bodyParser from "body-parser";

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(userAuthRoutes);

app.listen(port, () => {
   console.log(`[server]: Server is running at http://localhost:${port}`);
});
