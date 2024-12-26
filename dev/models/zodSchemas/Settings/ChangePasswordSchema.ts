import { z } from "zod";
import { baseUserSchema, passConfRefinement } from "../User/baseUserSchema";

export const ChangePasswordSchema = passConfRefinement(
  z.object({
    oldPassword: baseUserSchema.shape.password,
    newPassword: baseUserSchema.shape.password,
    passConfirm: baseUserSchema.shape.passConfirm,
  })
);
