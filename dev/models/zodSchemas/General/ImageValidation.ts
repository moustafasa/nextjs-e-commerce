import { z } from "zod";

export const ImageValidation = z
  .instanceof(File)
  .refine((file) => file.size < 4.5 * 1024 * 1024, "max file size is 4.5MB")
  .refine(
    (file) =>
      ["image/png", "image/jpeg", "image/jpg"].includes(file.type) ||
      !file.size,
    "Only .png and .jpg files are accepted"
  );
