import { z } from "zod";

export const baseProductSchema = z.object({
  title: z.string(),
  category: z.string(),
  images: z.array(z.string()),
  descriptions: z
    .string()
    .min(20, "the description should be at least 20 characters"),
  price: z.coerce.number(),
  discount: z.coerce.number(),
});
