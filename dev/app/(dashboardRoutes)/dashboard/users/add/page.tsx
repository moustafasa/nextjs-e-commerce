"use client";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import SubmitButton from "@/app/_components/Forms/SubmitButton";
import { addUserInputs } from "@/config/addUsersInputs";
import { addUserAction } from "@/lib/usersActions";
import { AddUserFlattenedError } from "@/models/zodSchemas/User/addUserSchema";
import React from "react";
import { useFormState } from "react-dom";

export default function Page() {
  const [errors, formAction] = useFormState(addUserAction, undefined);

  return (
    <FormLayout
      formAction={formAction}
      heading="add user"
      errors={errors?.formErrors}
    >
      {addUserInputs.map((input) => (
        <FormField
          key={input.id}
          input={input}
          errors={
            errors?.fieldErrors[
              input.name as keyof AddUserFlattenedError["fieldErrors"]
            ]
          }
        />
      ))}

      <SubmitButton label="add" />
    </FormLayout>
  );
}
