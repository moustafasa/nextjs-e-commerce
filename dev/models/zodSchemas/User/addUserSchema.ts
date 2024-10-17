import { z } from "zod";
import {
  baseUserSchema,
  passConfRefinement,
  passOptionalityRefinement,
} from "./baseUserSchema";

const addUserSchema = passOptionalityRefinement(
  passConfRefinement(
    baseUserSchema.extend({
      password: z.union([baseUserSchema.shape.password, z.literal("")]),
    })
  )
);

export type AddUserSchemaType = z.infer<typeof addUserSchema>;
export type AddUserFlattenedError = z.inferFlattenedErrors<
  typeof addUserSchema
>;
export default addUserSchema;
