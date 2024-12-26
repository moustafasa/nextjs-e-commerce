import { auth, signIn } from "@/auth";
import dbConnect from "@/config/dbConnect";
import Users from "@/models/database/Users";
import { MyProfileSchemaType } from "@/models/zodSchemas/Settings/MyProfileSchema";
import { del, put } from "@vercel/blob";
import { redirect } from "next/navigation";
import path from "path";
import { comparePasswords } from "./usersControllers";
import { SettingsPasswordInCorrect, UserExistingError } from "./customErrors";
import { getToken } from "next-auth/jwt";

export const changeMyProfile = async (result: MyProfileSchemaType) => {
  await dbConnect();
  const session = await auth();
  if (!session?.user) {
    return redirect("/sign-in");
  }
  const user = await Users.findById(session.user.userId).exec();

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
  }

  if (user.email !== result.email && session.provider === "credentials") {
    const foundUser = await Users.findOne({
      email: result.email,
    }).exec();
    if (foundUser) {
      throw new UserExistingError();
    }

    user.email = result.email;
  }
  if (result.image.size > 0) {
    await del(`/profiles/${user.image}`);
    const ext = path.extname(result.image.name);
    const { url: imageURl } = await put(
      `/profiles/${result.email}.${ext}`,
      result.image,
      { access: "public" }
    );
    user.image = imageURl;
  }
  await user.save();

  await signIn(
    session.provider,
    session.provider === "credentials"
      ? {
          email: user.email,
          password: result.password,
        }
      : undefined
  );
};
