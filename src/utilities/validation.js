import z from "zod";

export const envValidator = z.object({
  PORT: z.string(),
  FRONTEND_URL: z.string(),
  SESSION_SECRET: z.string(),
  JWT_TOKEN_SECRET: z.string(),
  FRONTEND_URL: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PORT: z.string(),
  DATABASE_NAME: z.string(),
});

export const registerValidator = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});
