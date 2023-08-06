import { string } from "zod";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string;
      UPLOADTHING_SECRET: string;
      UPLOADTHING_APP_ID: string;
      NODE_ENV: "development" | "production";
    }
  }
}

export {};
