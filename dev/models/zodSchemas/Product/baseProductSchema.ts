import { z } from "zod";

export const baseProductSchema = z.object({
  title: z.string().min(1, "the title field is required"),
  category: z.string(),
  images: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size < 4.5 * 1024 * 1024,
          "max file size is 4.5MB"
        )
        .refine(
          (file) =>
            ["image/png", "image/jpeg", "image/jpg"].includes(file.type) ||
            !file.size,
          "Only .png and .jpg files are accepted"
        )
    )
    .min(1, "the images is required"),
  descriptions: z
    .string()
    .min(1, "the description field is required")
    .min(20, "the description should be at least 20 characters"),
  price: z.coerce.number().min(1, "the price field is required"),
  discount: z.coerce.number().default(0),
});
