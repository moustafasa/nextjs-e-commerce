import { z } from "zod";
import { ImageValidation } from "../General/ImageValidation";

export const baseCategorySchema = z.object({
  title: z
    .string({ required_error: "this field is required" })
    .min(1, "this field is required")
    .min(3, "the title should't be less than 3 characters"),
  image: ImageValidation,
});
