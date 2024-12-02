import { z } from "zod";

export const baseProductSchema = z.object({
  title: z.string().min(1, "the title field is required"),
  category: z
    .string({ required_error: "please choose category" })
    .min(1, "please choose category"),
  images: z
    .array(z.instanceof(File), { required_error: "images is required" })
    .refine((files) =>
      files.every(
        (file) => file.size < 4.5 * 1024 * 1024,
        "max file size is 4.5MB"
      )
    )
    .refine(
      (files) =>
        files.every((file) =>
          ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
        ),
      "Only .png and .jpg files are accepted"
    ),
  descriptions: z
    .string()
    .min(1, "the description field is required")
    .min(20, "the description should be at least 20 characters"),
  price: z.coerce.number().min(1, "the price field is required"),
  discount: z.coerce.number().default(0),
});
