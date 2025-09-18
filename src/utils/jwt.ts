// src/utils/jwt.ts
import jwt, { SignOptions } from "jsonwebtoken";
import cfg from "../config";

export function signToken(payload: object) {
  // ✅ Explicitly cast JWT_EXP to a valid type
  const options: SignOptions = {
    expiresIn: cfg.JWT_EXP as SignOptions["expiresIn"], // Fix TS error
  };

  return jwt.sign(payload, cfg.JWT_SECRET, options);
}

export function verifyToken<T>(token: string): T | null {
  try {
    return jwt.verify(token, cfg.JWT_SECRET) as T;
  } catch {
    return null;
  }
}
