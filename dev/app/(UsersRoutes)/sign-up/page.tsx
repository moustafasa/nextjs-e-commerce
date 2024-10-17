"use client";
import GoogleForm from "@/app/_components/Forms/GoogleForm";
import FormField from "@/app/_components/Forms/FormField/FormField";
import { signUpInputs } from "@/config/signUpInputs";
import { signUpAction } from "@/lib/usersActions";
import { useFormState } from "react-dom";
import SubmitButton from "@/app/_components/Forms/SubmitButton";
import FormErrors from "@/app/_components/Forms/FormErrors";
import OrSeperator from "@/app/_components/Forms/OrSeperator";
import { SignUpFlattenedError } from "@/models/zodSchemas/User/signupSchema";

export default function Page() {
  const [errors, formAction] = useFormState(signUpAction, undefined);
  return (
    <div className="px-3">
      <div className="capitalize max-w-[700px] bg-black-secondary-bg mt-10 mx-auto text-white p-7 rounded-lg shadow-lg">
        <form
          className="grid grid-cols-[1fr] sm:gap-x-6 sm:grid-cols-[auto_1fr] items-center "
          action={formAction}
        >
          <FormErrors errors={errors?.formErrors} />
          <h2 className=" sm:col-span-2 text-2xl font-bold text-center mb-6">
            sign up
          </h2>

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

          <SubmitButton label="sign up" />
        </form>
        <OrSeperator />
        <GoogleForm label="sign up with google" />
      </div>
    </div>
  );
}
