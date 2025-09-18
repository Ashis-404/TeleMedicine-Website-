import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cfg from "./config";
import authRoutes from "./routes/auth";
import profileRoutes from "./routes/profile";

dotenv.config();

const app: Application = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api", profileRoutes);

// ✅ Health Check Route (Good for debugging)
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "✅ Backend is running!" });
});

// ✅ Start Server
const PORT = cfg.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
