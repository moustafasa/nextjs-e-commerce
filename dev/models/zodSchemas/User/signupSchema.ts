import { z } from "zod";
import { baseUserSchema, passConfRefinement } from "./baseUserSchema";

const signUpSchema = passConfRefinement(
  baseUserSchema.omit({ roles: true }).extend({
    image: z
      .instanceof(File)
      .refine((file) => file.size < 4.5 * 1024 * 1024, "max file size is 4.5MB")
      .refine(
        (file) =>
          ["image/png", "image/jpeg", "image/jpg"].includes(file.type) ||
          !file.size,
        "Only .png and .jpg files are accepted"
      ),
    password: baseUserSchema.shape.password.min(1, {
      message: "the password is required",
    }),
    passConfirm: baseUserSchema.shape.passConfirm.min(1, {
      message: "the repeat password is required",
    }),
  })
);

export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignUpFlattenedError = z.inferFlattenedErrors<typeof signUpSchema>;
export default signUpSchema;
