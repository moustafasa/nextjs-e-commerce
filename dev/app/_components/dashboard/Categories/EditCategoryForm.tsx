"use client";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import SubmitButton from "@/app/_components/Forms/SubmitButton";
import { addCategoryInputs } from "@/config/addCategoryInputs";
import { editCategoryAction } from "@/lib/categoriesActions";
import { ICategories } from "@/models/database/Categories";
import { AddCategoryFlattenedError } from "@/models/zodSchemas/Category/addCategorySchema";
import React, { ChangeEvent, useMemo, useState } from "react";
import { useFormState } from "react-dom";
import Form from "../../Forms/Form";

type Props = {
  category: ICategories;
};

export default function EditCategoryForm({ category }: Props) {
  const [errors, formAction] = useFormState(
    editCategoryAction.bind(undefined, category._id as string),
    undefined
  );
  const [fields, setFields] = useState(
    Object.fromEntries(
      addCategoryInputs.map((input) => {
        if (input.type !== "file")
          return [input.name, category[input.name as keyof typeof category]];
        return [input.name, false];
      })
    )
  );

  const isChanged = useMemo(
    () =>
      Object.keys(fields).some((fieldKey) =>
        typeof fields[fieldKey] === "boolean"
          ? !!fields[fieldKey]
          : fields[fieldKey] !== category[fieldKey as keyof typeof category]
      ),
    [category, fields]
  );

  return (
    <FormLayout heading="edit category" errors={errors?.formErrors}>
      <Form formAction={formAction}>
        {addCategoryInputs.map((input) => (
          <FormField
            key={input.id}
            input={input}
            errors={
              errors?.fieldErrors[
                input.name as keyof AddCategoryFlattenedError["fieldErrors"]
              ]
            }
            defaultValue={category[input.id as keyof typeof category] as string}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (
                !Object.values(fields).some(
                  (value) => typeof value === "boolean" && !!value
                )
              ) {
                if (e.target.files) {
                  setFields({ ...fields, [input.id]: true });
                } else {
                  setFields({ ...fields, [input.id]: e.target.value });
                }
              }
            }}
          />
        ))}
        <SubmitButton label="save" disabled={!isChanged} />
      </Form>
    </FormLayout>
  );
}
