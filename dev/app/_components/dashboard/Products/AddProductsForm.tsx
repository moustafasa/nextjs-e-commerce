"use client";
import { useActionState } from "react";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import FormButton from "@/app/_components/Forms/FormButton";
import { addProductsInputs } from "@/config/addProductInputs";
import { addProductsAction } from "@/lib/productsActions";
import { AddProductFlattenedError } from "@/models/zodSchemas/Product/addProductsSchema";
import Form from "../../Forms/Form";
import AddProductImage from "./AddProductImage";
import useIsImageLoading from "@/app/_utilities/addProductContext/useIsImageLoading";

type Props = {
  categories: SelectOption[];
};
export default function AddProductsForm({ categories }: Props) {
  const [errors, formAction] = useActionState(addProductsAction, undefined);
  const [isImageLoading] = useIsImageLoading();

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
            defaultValue={input.type === "select" ? "" : undefined}
          />
        ))}
        <AddProductImage serverErrors={errors?.fieldErrors.images} />
        <FormButton label="add" disabled={isImageLoading} />
      </Form>
    </FormLayout>
  );
}
