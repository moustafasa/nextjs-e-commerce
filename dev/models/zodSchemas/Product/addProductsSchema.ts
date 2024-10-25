import { z } from "zod";
import { baseProductSchema } from "./baseProductSchema";

const addProductSchema = baseProductSchema;

export type AddProductSchemaType = z.infer<typeof addProductSchema>;
export type AddProductFlattenedError = z.inferFlattenedErrors<
  typeof addProductSchema
>;
export default addProductSchema;
