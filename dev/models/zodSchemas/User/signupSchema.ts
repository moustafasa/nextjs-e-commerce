import { z } from "zod";
import { baseUserSchema, passConfRefinement } from "./baseUserSchema";
import { ImageValidation } from "../General/ImageValidation";

const signUpSchema = passConfRefinement(
  baseUserSchema.omit({ roles: true }).extend({
    image: ImageValidation,
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
