"use server";
import type {
  SignUpFlattenedError,
  SignUpSchemaType,
} from "@/models/zodSchemas/User/signupSchema";
import type { SignInFlattenedError } from "@/models/zodSchemas/User/signInSchema";
import signUpSchema from "@/models/zodSchemas/User/signupSchema";
import signInSchema from "@/models/zodSchemas/User/signInSchema";
import { signIn, signOut } from "@/auth";
import { CredentialsSignin } from "next-auth";
import addUserSchema, {
  type AddUserFlattenedError,
} from "@/models/zodSchemas/User/addUserSchema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import editUserSchema, {
  type EditUserFlattenedError,
} from "@/models/zodSchemas/User/editUserSchema";
import { addUser, deleteUser, editUser, signUp } from "./usersControllers";
import { UserExistingError } from "./customErrors";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function signUpAction(
  _prevState: SignUpFlattenedError | undefined,
  formData: FormData
) {
  const registeredData = Object.fromEntries(formData);
  const result = signUpSchema.safeParse(registeredData);
  if (!result.success) {
    return result.error.flatten();
  }

  try {
    await signUp(result.data);
  } catch (_err) {
    if (_err instanceof UserExistingError) {
      return { formErrors: ["the email is already exist"], fieldErrors: {} };
    }
    return { formErrors: ["there is a network error"], fieldErrors: {} };
  }

  redirect("/sign-in");
}

export async function signinAction(
  _prevState: SignInFlattenedError | undefined,
  formData: FormData
) {
  const registeredData = Object.fromEntries(formData) as SignUpSchemaType;
  const result = signInSchema.safeParse(registeredData);

  if (!result.success) {
    return result.error.flatten();
  }

  try {
    await signIn("credentials", result.data);
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    if (err instanceof CredentialsSignin) {
      return { fieldErrors: {}, formErrors: ["invalid credentials"] };
    }
    console.log(err);
    return { fieldErrors: {}, formErrors: ["network error"] };
  }
}

export async function googleSignIn() {
  await signIn("google");
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function addUserAction(
  _prevState: AddUserFlattenedError | undefined,
  formData: FormData
) {
  const registeredData = {
    ...Object.fromEntries(formData),
    roles: formData.getAll("roles"),
  };
  const result = addUserSchema.safeParse(registeredData);

  if (!result.success) {
    return result.error.flatten();
  }

  try {
    await addUser(result.data);
  } catch (_err) {
    if (_err instanceof UserExistingError)
      return {
        formErrors: ["the email or username is already exist"],
        fieldErrors: {},
      };

    return { formErrors: ["there is network error"], fieldErrors: {} };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteUserAction(_id: string) {
  try {
    await deleteUser(_id);
  } catch (err) {
    throw err;
  }
  revalidatePath("/dashboard");
}

export async function editUserAction(
  id: string,
  _prevState: EditUserFlattenedError | undefined,
  formData: FormData
) {
  const registeredData = {
    ...Object.fromEntries(formData),
    roles: formData.getAll("roles"),
  };
  const result = editUserSchema.safeParse(registeredData);

  if (!result.success) {
    return result.error.flatten();
  }

  try {
    await editUser(id, result.data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return { formErrors: ["network error"], fieldErrors: {} };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
