import { z } from "zod";

const signInSchema = z.object({
  email: z
    .string({ required_error: "email is required" })
    .min(1, "email is required"),
  password: z
    .string({ required_error: "password is required" })
    .min(1, "password is required"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignInFlattenedError = z.inferFlattenedErrors<typeof signInSchema>;
export default signInSchema;
