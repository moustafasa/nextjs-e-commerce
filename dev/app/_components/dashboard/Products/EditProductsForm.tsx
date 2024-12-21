"use client";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import SubmitButton from "@/app/_components/Forms/SubmitButton";
import { addProductsInputs } from "@/config/addProductInputs";
import { editProductAction } from "@/lib/productsActions";
import { AddProductFlattenedError } from "@/models/zodSchemas/Product/addProductsSchema";
import { useFormState } from "react-dom";
import Form from "../../Forms/Form";
import useIsImageLoading from "@/app/_utilities/addProductContext/useIsImageLoading";
import { IProducts } from "@/models/database/Products";
import EditProductImage from "./EditProductImage";
import useDeletedImagesUrls from "@/app/_utilities/addProductContext/useDeletedImagesUrls";
import useImagesUrls from "@/app/_utilities/addProductContext/useImagesUrls";
import { ChangeEvent, useMemo, useState } from "react";

type Props = {
  categories: SelectOption[];
  product: IProducts;
};
export default function EditProductsForm({ categories, product }: Props) {
  const [errors, formAction] = useFormState(
    editProductAction.bind(undefined, product._id.toString()),
    undefined
  );
  const [isImageLoading] = useIsImageLoading();
  const [deletedImages] = useDeletedImagesUrls();
  const [imagesUrls] = useImagesUrls();
  const [fields, setFields] = useState(
    Object.fromEntries(
      addProductsInputs.map((input) => [
        input.name,
        product[input.name as keyof typeof product]?.toString(),
      ])
    )
  );

  const isChanged = useMemo(
    () =>
      Object.keys(fields).some(
        (key) =>
          fields[key] !== product[key as keyof typeof product]?.toString()
      ) ||
      imagesUrls.length > 0 ||
      deletedImages.length > 0,
    [deletedImages.length, fields, imagesUrls.length, product]
  );

  return (
    <FormLayout heading="add product" errors={errors?.formErrors}>
      <Form formAction={formAction}>
        {addProductsInputs.map((input) => (
          <FormField
            key={input.id}
            input={
              input.name === "category" && input.type === "select"
                ? {
                    ...input,
                    options: [...input.options, ...categories],
                  }
                : input
            }
            errors={
              errors?.fieldErrors[
                input.name as keyof Omit<
                  AddProductFlattenedError["fieldErrors"],
                  "images"
                >
              ]
            }
            defaultValue={fields[input.name]}
            onChange={(
              e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
              setFields((prev) => ({ ...prev, [input.name]: e.target.value }));
            }}
          />
        ))}
        <EditProductImage
          serverErrors={errors?.fieldErrors.images}
          images={product.images}
        />
        <SubmitButton label="save" disabled={isImageLoading || !isChanged} />
      </Form>
    </FormLayout>
  );
}
