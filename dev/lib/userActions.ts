"use server";
import bcrypt from "bcryptjs";
import type {
  SignUpFlattenedError,
  SignUpSchemaType,
} from "@/models/zodSchemas/signupSchema";
import type { SignInFlattenedError } from "@/models/zodSchemas/signInSchema";
import signUpSchema from "@/models/zodSchemas/signupSchema";
import Users, { roles } from "@/models/database/Users";
import dbConnect from "@/config/dbConnect";
import signInSchema from "@/models/zodSchemas/signInSchema";
import { signIn, signOut } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function signUpAction(
  _prevState: SignUpFlattenedError | undefined,
  formData: FormData
) {
  const registeredData = Object.fromEntries(formData) as SignUpSchemaType;
  const result = signUpSchema.safeParse(registeredData);
  if (!result.success) {
    return result.error.flatten();
  }
  try {
    await dbConnect();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    console.log(_);
    return { formErrors: ["network error"], fieldErrors: {} };
  }
  const userFound = await Users.findOne({
    email: result.data.email,
  }).exec();
  if (userFound) {
    return { formErrors: ["the email is already exist"], fieldErrors: {} };
  }

  const hashedPass = await bcrypt.hash(result.data.password, 10);
  try {
    await Users.create({
      fullName: result.data.fullName,
      email: result.data.email,
      password: hashedPass,
      role: roles.USER,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_err) {
    console.log(_err);
    return { formErrors: ["there is network error"], fieldErrors: {} };
  }

  return undefined;
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
    await signIn("credentials", formData);
  } catch (err) {
    console.log("err");
    if (isRedirectError(err)) {
      console.log("redirect err");
      throw err;
    }
    if (err instanceof CredentialsSignin) {
      console.log("credentials err");
      return { fieldErrors: {}, formErrors: ["invalid credentials"] };
    }
    console.log("other", (err as Error).cause);
    return { fieldErrors: {}, formErrors: ["network error"] };
  }
}

export async function googleSignIn() {
  await signIn("google");
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
