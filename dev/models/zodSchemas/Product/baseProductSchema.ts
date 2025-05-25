import path from "path";
import { z } from "zod";

export const baseProductSchema = z.object({
  title: z.string().min(1, "the title field is required"),
  category: z
    .string({ required_error: "please choose category" })
    .min(1, "please choose category"),
  images: z
    .string()
    .transform((images) => JSON.parse(images) as string[])
    .refine(
      (images) =>
        images.every((img) =>
          [".jpg", ".png", ".jpeg", ".wepb"].includes(path.extname(img))
        ),
      "only .jpg and .png and .wepb files is allowed"
    ),
  descriptions: z
    .string()
    .min(1, "the description field is required")
    .min(20, "the description should be at least 20 characters"),
  stock: z.coerce.number().min(1, "the price field is required"),
  price: z.coerce.number().min(1, "the price field is required"),
  discount: z.coerce.number().default(0),
});
