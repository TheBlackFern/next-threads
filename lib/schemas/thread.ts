import * as z from "zod";

export const threadSchema = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "String at least 3 characters together." })
    .max(30, { message: "Your name is too long." }),
  accountId: z.string(),
});
