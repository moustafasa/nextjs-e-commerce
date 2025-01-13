"use client";
import { useActionState } from "react";
import GoogleForm from "@/app/_components/Forms/GoogleForm";
import FormField from "@/app/_components/Forms/FormField/FormField";
import { signUpInputs } from "@/config/signUpInputs";
import { signUpAction } from "@/lib/usersActions";
import FormButton from "@/app/_components/Forms/FormButton";
import OrSeperator from "@/app/_components/Forms/OrSeperator";
import { SignUpFlattenedError } from "@/models/zodSchemas/User/signupSchema";
import FormLayout from "@/app/_components/Forms/FormLayout";
import Form from "@/app/_components/Forms/Form";

export default function Page() {
  const [errors, formAction] = useActionState(signUpAction, undefined);
  return (
    <FormLayout heading="sign up" errors={errors?.formErrors}>
      <Form formAction={formAction}>
        {signUpInputs.map((input) => (
          <FormField
            key={input.id}
            input={input}
            errors={
              errors?.fieldErrors[
                input.name as keyof SignUpFlattenedError["fieldErrors"]
              ]
            }
          ></FormField>
        ))}

        <FormButton label="sign up" />
      </Form>

      <OrSeperator />
      <GoogleForm label="sign up with google" />
    </FormLayout>
  );
}
