"use client";
import Form from "@/app/_components/Forms/Form";
import FormButton from "@/app/_components/Forms/FormButton";
import FormField from "@/app/_components/Forms/FormField/FormField";
import useSettingsLayoutErrors from "@/app/_utilities/SettingsLayoutErrorsContext/useSettingsLayoutErrors";
import { PasswordInputs } from "@/config/SettingsInputs";
import { changePasswordAction } from "@/lib/SettingsActions";
import { useEffect, useActionState } from "react";

export default function Page() {
  const [errors, formAction] = useActionState(changePasswordAction, undefined);
  const [, setErrors] = useSettingsLayoutErrors();

  useEffect(() => {
    setErrors(errors?.formErrors || []);
  }, [errors?.formErrors, setErrors]);

  return (
    <Form
      className="dark:bg-black-tertiery-bg bg-slate-200 p-14 rounded-lg"
      formAction={formAction}
    >
      {PasswordInputs.map((input) => (
        <FormField
          key={input.id}
          input={input}
          errors={errors?.fieldErrors[input.id]}
        />
      ))}
      <FormButton label="change password" />
    </Form>
  );
}
