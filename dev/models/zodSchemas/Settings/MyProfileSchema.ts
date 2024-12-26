import { z } from "zod";
import { baseUserSchema } from "../User/baseUserSchema";
import { ImageValidation } from "../General/ImageValidation";

export const MyProfileSchema = baseUserSchema.pick({ fullName: true }).extend({
  image: ImageValidation,
  password: z.string().optional(),
  email: baseUserSchema.shape.email.optional(),
});

export type MyProfileSchemaType = z.infer<typeof MyProfileSchema>;
export type MyProfileFlattenedError = z.inferFlattenedErrors<
  typeof MyProfileSchema
>;
