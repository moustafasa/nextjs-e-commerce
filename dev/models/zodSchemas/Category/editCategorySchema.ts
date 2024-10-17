import { z } from "zod";
import { baseCategorySchema } from "./BaseCategorySchema";

const editCategorySchema = baseCategorySchema;

export type EditCategorySchemaType = z.infer<typeof editCategorySchema>;
export type EditCategoryFlattenedError = z.inferFlattenedErrors<
  typeof editCategorySchema
>;
export default editCategorySchema;
