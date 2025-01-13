"use client";
import { useActionState } from "react";
import Form from "@/app/_components/Forms/Form";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import GoogleForm from "@/app/_components/Forms/GoogleForm";
import OrSeperator from "@/app/_components/Forms/OrSeperator";
import FormButton from "@/app/_components/Forms/FormButton";
import { signInInputs } from "@/config/signInInputs";
import { signinAction } from "@/lib/usersActions";
import { SignInFlattenedError } from "@/models/zodSchemas/User/signInSchema";

export default function Page() {
  const [errors, formAction] = useActionState(signinAction, undefined);

  return (
    <FormLayout heading="sign in" errors={errors?.formErrors}>
      <Form formAction={formAction}>
        {signInInputs.map((input) => (
          <FormField
            key={input.id}
            input={input}
            errors={
              errors?.fieldErrors[
                input.name as keyof SignInFlattenedError["fieldErrors"]
              ]
            }
          />
        ))}
        <FormButton label="sign in" />
      </Form>
      <OrSeperator />
      <GoogleForm label="sign in with google" />
    </FormLayout>
  );
}
