import { z } from "zod";
import { baseProductSchema } from "./baseProductSchema";

const addProductSchema = baseProductSchema.extend({
  images: baseProductSchema.shape.images
    .refine(
      (images) => images.length >= 3,
      "you should choose at least three images"
    )
    .refine(
      (images) => images.length <= 4,
      "you should choose maximum 4 images"
    ),
});

export type AddProductSchemaType = z.infer<typeof addProductSchema>;
export type AddProductFlattenedError = z.inferFlattenedErrors<
  typeof addProductSchema
>;
export default addProductSchema;
