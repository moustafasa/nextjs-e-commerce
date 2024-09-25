"use client";
import FormErrors from "@/app/components/Forms/FormErrors";
import FormField from "@/app/components/Forms/FormField";
import GoogleForm from "@/app/components/Forms/GoogleForm";
import OrSeperator from "@/app/components/Forms/OrSeperator";
import SubmitButton from "@/app/components/Forms/SubmitButton";
import { signInInputs } from "@/config/signInInputs";
import { signinAction } from "@/lib/userActions";
import { useFormState } from "react-dom";

export default function Page() {
  const [errors, formAction] = useFormState(signinAction, undefined);

  return (
    <div className="px-3">
      <div className="capitalize max-w-[700px] bg-black-tertiery-bg mt-24 mx-auto text-white p-7 rounded-lg">
        <form
          className="grid grid-cols-[1fr] sm:gap-x-6 sm:grid-cols-[auto_1fr] items-center "
          action={formAction}
        >
          <FormErrors errors={errors?.formErrors} />
          <h2 className=" sm:col-span-2 text-2xl font-bold text-center mb-6">
            sign in
          </h2>

          {signInInputs.map((input) => (
            <FormField key={input.id} input={input} errors={errors} />
          ))}

          <SubmitButton label="sign in" />
        </form>
        <OrSeperator />
        <GoogleForm label="sign in with google" />
      </div>
    </div>
  );
}
