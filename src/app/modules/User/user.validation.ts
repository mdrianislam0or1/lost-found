import { object, string, number } from "zod";

export const userProfileSchema = object({
  bio: string(),
  age: number().int(),
});

export const registerUserSchema = object({
  name: string(),
  email: string().email(),
  password: string().min(6),
  profile: userProfileSchema,
});
