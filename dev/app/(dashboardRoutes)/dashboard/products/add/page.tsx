"use client";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormTextArea from "@/app/_components/Forms/FormField/FormTextArea";
import FormLayout from "@/app/_components/Forms/FormLayout";
import SubmitButton from "@/app/_components/Forms/SubmitButton";
import { addProductsInputs } from "@/config/addProductInputs";
import { addCategoryAction } from "@/lib/categoriesActions";
import { addProductsAction } from "@/lib/productsActions";
import { AddCategoryFlattenedError } from "@/models/zodSchemas/Category/addCategorySchema";
import { AddProductFlattenedError } from "@/models/zodSchemas/Product/addProductsSchema";
import React from "react";
import { useFormState } from "react-dom";

export default function Page() {
  const [errors, formAction] = useFormState(addProductsAction, undefined);

  return (
    <FormLayout
      formAction={formAction}
      heading="add product"
      errors={errors?.formErrors}
    >
      {addProductsInputs.map((input) => (
        <FormField
          key={input.id}
          input={input}
          errors={
            errors?.fieldErrors[
              input.name as keyof AddProductFlattenedError["fieldErrors"]
            ]
          }
        />
      ))}
      <SubmitButton label="add" />
    </FormLayout>
  );
}
