import dotenv from "dotenv";
import { access } from "fs/promises";

if (process.env.NODE_ENV !== "production") {
  const isLocalEnvExists = await access(".env.local")
    .then(() => true)
    .catch(() => false);

  const envPath = `.env.${isLocalEnvExists ? "local" : "development"}`;

  console.info(`Loading environment variables from ${envPath}`);

  dotenv.config({
    path: envPath,
  });
}

export const HOST_PORT = process.env.PORT ? process.env.HOST_PORT : 3000;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? process.env.GEMINI_API_KEY;
