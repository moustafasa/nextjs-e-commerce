import { z } from "zod";
import { baseUserSchema } from "./baseUserSchema";

const editUserSchema = baseUserSchema.omit({
  password: true,
  passConfirm: true,
});

export type EditUserSchemaType = z.infer<typeof editUserSchema>;
export type EditUserFlattenedError = z.inferFlattenedErrors<
  typeof editUserSchema
>;
export default editUserSchema;
