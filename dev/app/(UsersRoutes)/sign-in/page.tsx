"use client";
import Form from "@/app/_components/Forms/Form";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import GoogleForm from "@/app/_components/Forms/GoogleForm";
import OrSeperator from "@/app/_components/Forms/OrSeperator";
import SubmitButton from "@/app/_components/Forms/SubmitButton";
import { signInInputs } from "@/config/signInInputs";
import { signinAction } from "@/lib/usersActions";
import { SignInFlattenedError } from "@/models/zodSchemas/User/signInSchema";
import { useFormState } from "react-dom";

export default function Page() {
  const [errors, formAction] = useFormState(signinAction, undefined);

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
        <SubmitButton label="sign in" />
      </Form>
      <OrSeperator />
      <GoogleForm label="sign in with google" />
    </FormLayout>
  );
}
