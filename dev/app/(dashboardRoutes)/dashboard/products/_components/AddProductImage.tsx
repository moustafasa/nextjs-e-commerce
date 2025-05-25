"use client";
import { productsImages } from "@/config/addProductInputs";
import {
  ChangeEvent,
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import addProductImageSchema from "@/models/zodSchemas/Product/addProductsImageSchema";
import useImagesUrls from "@/app/context/addProductContext/useImagesUrls";
import useIsImageLoading from "@/app/context/addProductContext/useIsImageLoading";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FileInputShowItem from "@/app/_components/Forms/FormField/FileInputShowItem";

type Props = { serverErrors?: string[] };
export default function AddProductImage({ serverErrors }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [imagesUrls] = useImagesUrls();
  const [, setIsLoading] = useIsImageLoading();

  useEffect(() => {
    startTransition(() => {
      setIsLoading(files.length !== imagesUrls.length);
    });
  }, [imagesUrls.length, files.length, setIsLoading]);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      if (ev.target.files) {
        if (files.length + ev.target.files.length > 4) {
          setErrors(["each product has an limit for 4 images"]);
        } else {
          setErrors([]);
          const result = addProductImageSchema.safeParse([
            ...(ev.target.files as FileList),
          ]);

          if (result.success) {
            setFiles((prev) => [
              ...prev,
              ...result.data.filter(
                (file) =>
                  !files.find(
                    (fl) =>
                      fl.name === file.name &&
                      fl.size === file.size &&
                      fl.lastModified === file.lastModified
                  )
              ),
            ]);
          } else {
            setErrors(result.error.format()._errors);
          }
        }
      }
      ev.target.value = "";
    });
  };
  const fileDelete = useCallback((file: File) => {
    return () => {
      setFiles((files) => files.filter((fl) => fl !== file));
    };
  }, []);

  return (
    <>
      <FormField
        input={productsImages}
        errors={[...errors, ...(serverErrors || [])]}
        onChange={handleChange}
      />
      <ul className=" sm:col-span-2 mb-6 grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-8">
        {files.map((file) => (
          <FileInputShowItem
            key={file.name}
            file={file}
            deleteMethod={fileDelete(file)}
          />
        ))}
      </ul>
      <input type="hidden" name="images" value={JSON.stringify(imagesUrls)} />
    </>
  );
}
