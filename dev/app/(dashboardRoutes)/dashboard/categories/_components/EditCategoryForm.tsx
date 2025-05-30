"use client";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import FormButton from "@/app/_components/Forms/FormButton";
import { addCategoryInputs } from "@/config/addCategoryInputs";
import { editCategoryAction } from "@/lib/categoriesActions";
import { ICategories } from "@/models/database/Categories";
import { AddCategoryFlattenedError } from "@/models/zodSchemas/Category/addCategorySchema";
import React, { ChangeEvent, useMemo, useState, useActionState } from "react";
import Form from "@/app/_components/Forms/Form";

type Props = {
  category: ICategories;
};

export default function EditCategoryForm({ category }: Props) {
  const [errors, formAction] = useActionState(
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
            key={input.name}
            input={input}
            errors={
              errors?.fieldErrors[
                input.name as keyof AddCategoryFlattenedError["fieldErrors"]
              ]
            }
            defaultValue={
              category[input.name as keyof typeof category] as string
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (
                !Object.values(fields).some(
                  (value) => typeof value === "boolean" && !!value
                )
              ) {
                if (e.target.files) {
                  setFields({ ...fields, [input.name]: true });
                } else {
                  setFields({ ...fields, [input.name]: e.target.value });
                }
              }
            }}
          />
        ))}
        <FormButton label="save" disabled={!isChanged} />
      </Form>
    </FormLayout>
  );
}
