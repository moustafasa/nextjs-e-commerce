import { z } from "zod";

const signUpSchema = z
  .object({
    fullName: z
      .string({ required_error: "the fullname is required" })
      .min(1, { message: "the full name is required" })
      .regex(
        /^[a-zA-Z]+\s[a-zA-z]+$/g,
        "the full name should contain the firstname and lastname seperated by space"
      )
      .toLowerCase(),
    email: z
      .string({ required_error: "email is required" })
      .min(1, { message: "the email is required" })
      .min(3, { message: "the email should be at least 3 characters" })
      .toLowerCase(),
    password: z
      .string({ required_error: "password is required" })
      .min(1, { message: "the password is required" })
      .min(6, { message: "password should be at least 6 characters" })
      .max(20, "password should't be more than 20 characters"),
    passConfirm: z
      .string({ required_error: "please repeat the password" })
      .min(1, { message: "the repeat password is required" }),
  })
  .refine((data) => data.password === data.passConfirm, {
    message: "repeated password should be identical with password",
    path: ["passConfirm"],
  });

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignUpFlattenedError = z.inferFlattenedErrors<typeof signUpSchema>;
export default signUpSchema;
