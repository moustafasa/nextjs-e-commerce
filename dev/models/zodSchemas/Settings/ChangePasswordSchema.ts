import { z } from "zod";
import { baseUserSchema, passConfRefinement } from "../User/baseUserSchema";

export const ChangePasswordSchema = passConfRefinement(
  z.object({
    oldPassword: baseUserSchema.shape.password,
    newPassword: baseUserSchema.shape.password,
    passConfirm: baseUserSchema.shape.passConfirm,
  }),
  "newPassword",
  "passConfirm"
);

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
export type ChangePasswordFlattenedError = z.inferFlattenedErrors<
  typeof ChangePasswordSchema
>;
