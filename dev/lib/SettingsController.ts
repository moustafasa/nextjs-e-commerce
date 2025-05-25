import { auth, unstable_update } from "@/auth";
import dbConnect from "@/config/dbConnect";
import Users from "@/models/database/Users";
import { MyProfileSchemaType } from "@/models/zodSchemas/Settings/MyProfileSchema";
import { copy, del, put } from "@vercel/blob";
import { redirect } from "next/navigation";
import path from "path";
import { comparePasswords, hashPassword } from "./usersControllers";
import { SettingsPasswordInCorrect, UserExistingError } from "./customErrors";
import { ChangePasswordSchemaType } from "@/models/zodSchemas/Settings/ChangePasswordSchema";

export const changeMyProfile = async (result: MyProfileSchemaType) => {
  await dbConnect();
  const session = await auth();
  if (!session?.user) {
    return redirect("/sign-in");
  }
  const user = await Users.findById(session.user.userId).exec();
  const updatedSession: Partial<typeof session.user> = {};

  if (session.provider === "credentials") {
    const isMatch = await comparePasswords(
      result.password as string,
      user.password
    );

    if (!isMatch) {
      throw new SettingsPasswordInCorrect();
    }
  }

  if (user.fullName !== result.fullName) {
    user.fullName = result.fullName;
    updatedSession.fullName = result.fullName;
    session.user.fullName = result.fullName;
  }

  if (user.email !== result.email && session.provider === "credentials") {
    const foundUser = await Users.findOne({
      email: result.email,
    }).exec();
    if (foundUser) {
      throw new UserExistingError();
    }

    user.email = result.email;

    if (result.image.size < 0) {
      const ext = path.extname(user.image);
      const newImage = await copy(
        `${user.image}`,
        `/profiles/${result.email}.${ext}`,
        {
          access: "public",
        }
      );
      try {
        await del(user.image);
      } catch (err) {
        console.log(err);
      }
      user.image = newImage.url;
    }
    updatedSession.email = result.email;
  }
  if (result.image.size > 0) {
    try {
      await del(`${user.image}`);
    } catch (err) {
      console.log(err);
    }
    const ext = path.extname(result.image.name);
    const { url: imageURl } = await put(
      `/profiles/${user.email}.${ext}`,
      result.image,
      { access: "public" }
    );
    user.image = imageURl;
    updatedSession.image = imageURl;
  }
  await user.save();
  await unstable_update({ user: updatedSession });
};

export const changePassword = async (result: ChangePasswordSchemaType) => {
  await dbConnect();
  const session = await auth();
  if (!session?.user) {
    return redirect("/sign-in");
  }
  const user = await Users.findById(session.user.userId).exec();

  const isMatch = await comparePasswords(
    result.oldPassword as string,
    user.password
  );

  if (!isMatch) {
    throw new SettingsPasswordInCorrect();
  }

  const hashedPass = await hashPassword(result.newPassword);

  user.password = hashedPass;

  await user.save();
};
