"use server";
import {
  ChangePasswordFlattenedError,
  ChangePasswordSchema,
} from "./../models/zodSchemas/Settings/ChangePasswordSchema";

import {
  MyProfileFlattenedError,
  MyProfileSchema,
} from "@/models/zodSchemas/Settings/MyProfileSchema";
import { changeMyProfile, changePassword } from "./SettingsController";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { SettingsPasswordInCorrect, UserExistingError } from "./customErrors";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const changeMyProfileAction = async (
  prevState: MyProfileFlattenedError | undefined,
  formData: FormData
) => {
  const registeredData = Object.fromEntries(formData);
  const result = MyProfileSchema.safeParse(registeredData);
  if (!result.success) {
    return result.error.flatten();
  }
  try {
    await changeMyProfile(result.data);
    revalidatePath("/dashboard/settings");
    redirect("/dashboard/settings");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    if (err instanceof UserExistingError) {
      return { formErrors: ["the email is already exist"], fieldErrors: {} };
    }
    if (err instanceof SettingsPasswordInCorrect) {
      return {
        formErrors: [],
        fieldErrors: { password: ["password is incorrect"] },
      };
    }
    return { formErrors: ["network error"], fieldErrors: {} };
  }
};

export const changePasswordAction = async (
  prevState: ChangePasswordFlattenedError | undefined,
  formData: FormData
) => {
  const registeredData = Object.fromEntries(formData);
  const result = ChangePasswordSchema.safeParse(registeredData);
  if (!result.success) {
    return result.error.flatten();
  }
  try {
    await changePassword(result.data);
    redirect("/");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    if (err instanceof SettingsPasswordInCorrect) {
      return {
        formErrors: [],
        fieldErrors: { oldPassword: ["old password is incorrect"] },
      };
    }
    return { formErrors: ["network error"], fieldErrors: {} };
  }
};
