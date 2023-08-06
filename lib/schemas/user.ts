import * as z from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Your name should be at least 3 characters long." })
    .max(30, { message: "Your name is too long." }),
  username: z
    .string()
    .min(3, { message: "Your usename should be at least 3 characters long." })
    .max(30, { message: "Your usename is too long." }),
  bio: z
    .string()
    .min(3, { message: "Your bio should be at least 3 characters long." })
    .max(80, { message: "Your bio is too long." }),
  image: z.string().url().nonempty(),
});
