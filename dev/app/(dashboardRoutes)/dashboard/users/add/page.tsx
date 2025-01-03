"use client";
import Form from "@/app/_components/Forms/Form";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import FormButton from "@/app/_components/Forms/FormButton";
import { addUserInputs } from "@/config/addUsersInputs";
import { addUserAction } from "@/lib/usersActions";
import { AddUserFlattenedError } from "@/models/zodSchemas/User/addUserSchema";
import React, { useActionState } from "react";

export default function Page() {
  const [errors, formAction] = useActionState(addUserAction, undefined);

  return (
    <FormLayout heading="add user" errors={errors?.formErrors}>
      <Form formAction={formAction}>
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

        <FormButton label="add" />
      </Form>
    </FormLayout>
  );
}
