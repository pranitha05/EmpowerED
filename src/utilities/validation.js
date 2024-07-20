import z from "zod";

export const environmentValidator = z.object({
    PORT: z.string()
})
