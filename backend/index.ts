import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import logger from './src/config/logger';
import { apiLimiter } from './src/config/rateLimiting';
import { errorHandler } from './src/middlewares/errorHandler';
import authRoutes from './src/routes/auth.routes';


dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())
app.use(apiLimiter);
app.use(errorHandler)

app.get("/", (req: express.Request, res : express.Response) => {
  logger.info("Root route accessed");
  res.json({ message: "Welcome to TaskBoard API 🚀" });
})


app.use("/api/auth", authRoutes);

export default app;