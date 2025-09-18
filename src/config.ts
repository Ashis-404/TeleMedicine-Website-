import dotenv from "dotenv";
dotenv.config();

const cfg = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "telemed_db",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  JWT_EXP: process.env.JWT_EXP || "7d",
  OTP_TTL_MINUTES: process.env.OTP_TTL_MINUTES
    ? Number(process.env.OTP_TTL_MINUTES)
    : 10,
};

export default cfg;
