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
import RemoteImagesShowItem from "./RemoteImagesShowItem";
import useDeletedImagesUrls from "@/app/context/addProductContext/useDeletedImagesUrls";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FileInputShowItem from "@/app/_components/Forms/FormField/FileInputShowItem";

type Props = { serverErrors?: string[]; images?: string[] };
export default function EditProductImage({ serverErrors, images }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [imagesUrls] = useImagesUrls();
  const [, setIsLoading] = useIsImageLoading();
  const [deletedImages] = useDeletedImagesUrls();

  useEffect(() => {
    startTransition(() => {
      setIsLoading(files.length !== imagesUrls.length);
    });
  }, [imagesUrls.length, files.length, setIsLoading]);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      if (ev.target.files) {
        if (
          (images?.length || 0) +
            files.length +
            ev.target.files.length -
            deletedImages.length >
          4
        ) {
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
        {images
          ?.filter((img) => !deletedImages.includes(img))
          .map((img) => (
            <RemoteImagesShowItem key={img} img={img} />
          ))}
        {files.map((file) => (
          <FileInputShowItem
            key={file.name}
            file={file}
            deleteMethod={fileDelete(file)}
          />
        ))}
      </ul>
      <input type="hidden" name="images" value={JSON.stringify(imagesUrls)} />
      <input
        type="hidden"
        name="deletedImages"
        value={JSON.stringify(deletedImages)}
      />
    </>
  );
}
