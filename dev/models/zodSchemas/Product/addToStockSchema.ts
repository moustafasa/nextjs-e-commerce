import { z } from "zod";

export const addToStockSchema = z.object({
  category: z.string(),
  product: z.string().min(1, "the product field is required"),
  stock: z.coerce.number().min(1, "the stock field is required"),
});

export type AddToStockSchema = z.infer<typeof addToStockSchema>;
export type AddToStockFlattenedError = z.inferFlattenedErrors<
  typeof addToStockSchema
>;
