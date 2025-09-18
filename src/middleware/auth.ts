// src/middleware/auth.ts
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

interface AuthRequest extends Request {
  user?: any; // You can make this stricter if you know your user shape
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken<{ id: number; role: string }>(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  req.user = decoded;
  next();
}

export function requireRole(requiredRole: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Forbidden: Wrong role" });
    }
    next();
  };
}
