"use client";
import { useActionState } from "react";
import Form from "@/app/_components/Forms/Form";
import FormField from "@/app/_components/Forms/FormField/FormField";
import FormLayout from "@/app/_components/Forms/FormLayout";
import GoogleForm from "@/app/_components/Forms/GoogleForm";
import OrSeperator from "@/app/_components/Forms/OrSeperator";
import FormButton from "@/app/_components/Forms/FormButton";
import { signInInputs } from "@/config/signInInputs";
// import { signinAction } from "@/lib/usersActions";
import signInSchema, {
  SignInFlattenedError,
} from "@/models/zodSchemas/User/signInSchema";
import { SignUpSchemaType } from "@/models/zodSchemas/User/signupSchema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  async function clientSignIn(
    _prevState: SignInFlattenedError | undefined,
    formData: FormData
  ) {
    const registeredData = Object.fromEntries(formData) as SignUpSchemaType;
    const result = signInSchema.safeParse(registeredData);

    if (!result.success) {
      return result.error.flatten();
    }
    try {
      const response = await signIn("credentials", {
        ...result.data,
        redirect: false,
      });

      if (response?.ok) {
        router.refresh();
      }

      if (response?.error) {
        if (response.error === "CredentialsSignin") {
          return { fieldErrors: {}, formErrors: ["Invalid credentials"] };
        }
        return { fieldErrors: {}, formErrors: [response.error] };
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return { fieldErrors: {}, formErrors: ["Network error"] };
    }
  }

  const [errors, formAction] = useActionState(clientSignIn, undefined);

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
