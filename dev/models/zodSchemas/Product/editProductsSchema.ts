import { z } from "zod";
import { baseProductSchema } from "./baseProductSchema";

const editProductSchema = baseProductSchema.extend({
  deletedImages: z
    .string()
    .transform((images) => JSON.parse(images) as string[]),
});

export type EditProductSchemaType = z.infer<typeof editProductSchema>;
export type EditProductFlattenedError = z.inferFlattenedErrors<
  typeof editProductSchema
>;
export default editProductSchema;
