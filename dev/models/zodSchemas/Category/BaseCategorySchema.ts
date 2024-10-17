import { z } from "zod";

export const baseCategorySchema = z.object({
  title: z
    .string({ required_error: "this field is required" })
    .min(1, "this field is required")
    .min(3, "the title should't be less than 3 characters"),
  image: z
    .instanceof(File)
    .refine((file) => file.size < 4.5 * 1024 * 1024, "max file size is 4.5MB")
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "image/jpg"].includes(file.type) ||
        !file.size,
      "Only .png and .jpg files are accepted"
    ),
});
