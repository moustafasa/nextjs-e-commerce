"use client";
import { productsImages } from "@/config/addProductInputs";
import FormField from "../../Forms/FormField/FormField";
import { ChangeEvent, startTransition, useCallback, useState } from "react";
import FileInputShowItem from "../../Forms/FormField/FileInputShowItem";
import addProductImageSchema from "@/models/zodSchemas/Product/addProductsImageSchema";
import useImagesUrls from "@/app/_utilities/addProductContext/useImagesUrls";

type Props = { serverErrors?: string[] };
export default function AddProductImage({ serverErrors }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [imagesUrls] = useImagesUrls();

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      if (ev.target.files) {
        const result = addProductImageSchema.safeParse([
          ...(ev.target.files as FileList),
        ]);
        if (result.success) {
          setFiles((prev) => [...prev, ...(ev.target.files as FileList)]);
        } else {
          setErrors(result.error.format()._errors);
        }
      }
    });
  };
  const fileDelete = useCallback((file: File) => {
    return () => setFiles((files) => files.filter((fl) => fl !== file));
  }, []);

  return (
    <>
      <FormField
        input={productsImages}
        errors={[...errors, ...(serverErrors || [])]}
        onChange={handleChange}
      />
      <ul className=" sm:col-span-2 mb-6 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-8">
        {files.map((file, ind) => (
          <FileInputShowItem
            key={ind + file.name}
            file={file}
            deleteMethod={fileDelete(file)}
          />
        ))}
      </ul>
      <input type="hidden" name="images" value={JSON.stringify(imagesUrls)} />
    </>
  );
}
