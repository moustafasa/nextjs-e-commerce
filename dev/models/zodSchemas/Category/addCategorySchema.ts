import { z } from "zod";
import { baseCategorySchema } from "./BaseCategorySchema";

const addCategorySchema = baseCategorySchema.extend({
  image: baseCategorySchema.shape.image.refine(
    (file) => file.size > 0,
    "category image required"
  ),
});

export type AddCategorySchemaType = z.infer<typeof addCategorySchema>;
export type AddCategoryFlattenedError = z.inferFlattenedErrors<
  typeof addCategorySchema
>;
export default addCategorySchema;
