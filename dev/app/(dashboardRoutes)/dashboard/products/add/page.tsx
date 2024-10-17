"use client";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import SubmitButton from "@/app/_components/Forms/SubmitButton";
import { addProductsInputs } from "@/config/addProductInputs";
import { addCategoryAction } from "@/lib/categoriesActions";
import { AddCategoryFlattenedError } from "@/models/zodSchemas/Category/addCategorySchema";
import React from "react";
import { useFormState } from "react-dom";

export default function Page() {
  const [errors, formAction] = useFormState(addCategoryAction, undefined);

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
              input.name as keyof AddCategoryFlattenedError["fieldErrors"]
            ]
          }
        />
      ))}
      <SubmitButton label="add" />
    </FormLayout>
  );
}
