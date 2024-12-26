"use server";

import {
  MyProfileFlattenedError,
  MyProfileSchema,
} from "@/models/zodSchemas/Settings/MyProfileSchema";
import { changeMyProfile } from "./SettingsController";
import { isRedirectError } from "next/dist/client/components/redirect";
import { SettingsPasswordInCorrect, UserExistingError } from "./customErrors";

export const changeMyProfileAction = async (
  prevState: MyProfileFlattenedError | undefined,
  formData: FormData
) => {
  const registeredData = Object.fromEntries(formData);
  const result = MyProfileSchema.safeParse(registeredData);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }
  try {
    await changeMyProfile(result.data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.log(err);
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
  // revalidatePath("/dashboard/settings");
  // redirect("/dashboard/settings");
};
