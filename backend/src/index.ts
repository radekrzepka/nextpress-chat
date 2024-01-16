import express, { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import userAuthRoutes from "./routes/user/userAuthRoutes";

const app: Express = express();
const port = process.env.PORT || 3001;

const swaggerDefinition = {
   openapi: "3.0.0",
   info: {
      title: "Express API with Swagger",
      version: "1.0.0",
   },
};

const options = {
   swaggerDefinition,
   apis: ["./src/docs/**/*.yaml"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(userAuthRoutes);

app.listen(port, () => {
   console.log(`[server]: Server is running at http://localhost:${port}`);
});
