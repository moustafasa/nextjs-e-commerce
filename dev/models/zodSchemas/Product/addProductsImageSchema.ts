import { z } from "zod";
import { baseProductSchema } from "./baseProductSchema";

const addProductImageSchema = baseProductSchema.shape.images;

export type AddProductImageSchemaType = z.infer<typeof addProductImageSchema>;
export type AddProductImageFormattedError = z.inferFormattedError<
  typeof addProductImageSchema
>;
export default addProductImageSchema;
