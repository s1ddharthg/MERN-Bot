import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./utils/error-handler.js";
import { env } from "./utils/env.js";
const app = express();

//middlewares
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use("/api/v1", appRouter);
app.use(errorHandler);

export default app;
