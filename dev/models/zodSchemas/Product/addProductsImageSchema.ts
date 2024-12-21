import { z } from "zod";

const addProductImageSchema = z
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
  );

export type AddProductImageSchemaType = z.infer<typeof addProductImageSchema>;
export type AddProductImageFormattedError = z.inferFormattedError<
  typeof addProductImageSchema
>;
export default addProductImageSchema;
