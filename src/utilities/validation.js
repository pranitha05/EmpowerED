import z from "zod";

export const envValidator = z.object({
    PORT: z.string(),
    FRONTEND_URL: z.string(),
    SESSION_SECRET: z.string()
})

export const registerValidator = z.object({
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  });