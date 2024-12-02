import { z } from "zod";
import { baseProductSchema } from "./baseProductSchema";
import path from "path";

const addProductSchema = baseProductSchema.omit({ images: true }).extend({
  images: z
    .string()
    .transform((images) => JSON.parse(images) as string[])
    .refine(
      (images) =>
        images.every((img) =>
          [".jpg", ".png", ".jpeg"].includes(path.extname(img))
        ),
      "only .jpg and .png files is allowed"
    )
    .refine(
      (images) => images.length >= 3,
      "you should choose at least three images"
    ),
});

export type AddProductSchemaType = z.infer<typeof addProductSchema>;
export type AddProductFlattenedError = z.inferFlattenedErrors<
  typeof addProductSchema
>;
export default addProductSchema;
