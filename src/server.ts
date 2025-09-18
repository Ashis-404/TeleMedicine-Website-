import express from "express";
import cors from "cors";
import cfg from "./config";
import authRouter from "./routes/auth";
import profileRouter from "./routes/profile";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api", profileRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "TeleMedicine API Server is running" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(cfg.PORT, () => {
  console.log(`🚀 TeleMedicine API server running on port ${cfg.PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   🏥 Health check: http://localhost:${cfg.PORT}/api/health`);
  console.log(`   🔐 Authentication: http://localhost:${cfg.PORT}/api/auth/*`);
  console.log(`   👤 User Profile: http://localhost:${cfg.PORT}/api/me`);
});

export default app;