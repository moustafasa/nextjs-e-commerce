import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { Role } from "@/auth.config";
import dbConnect from "@/config/dbConnect";
import Users, { IUser } from "@/models/database/Users";
import { EditUserSchemaType } from "@/models/zodSchemas/User/editUserSchema";
import { isValidObjectId, type HydratedDocument } from "mongoose";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { AddUserSchemaType } from "@/models/zodSchemas/User/addUserSchema";
import { UserExistingError } from "./customErrors";
import { SignUpSchemaType } from "@/models/zodSchemas/User/signupSchema";
import { put } from "@vercel/blob";
import path from "path";
import checkAuth from "@/app/_utilities/checkAuth";

export const getUsers = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return redirect("/sign-in");
  }
  if (!session.user.roles.includes(Role.ADMIN)) {
    return redirect("/unauthorized");
  }
  await dbConnect();
  const users = await Users.find({
    email: { $ne: session.user.email },
  })
    .lean<IUser[]>()
    .exec();

  return users.map((user) => ({
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    roles: user.roles,
  }));
});

export const getUsersIds = cache(async () => {
  await dbConnect();
  const usersIds = await Users.find({}).select("_id").exec();
  return usersIds;
});

export const getUserById = cache(async (id: string) => {
  await checkAuth(Role.ADMIN);

  if (!isValidObjectId(id)) {
    return null;
  }

  await dbConnect();
  const user = await Users.findById<HydratedDocument<IUser>>(id)
    .select<HydratedDocument<IUser>>("-password -image")
    .exec();

  return user;
});

export const editUser = async (id: string, result: EditUserSchemaType) => {
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  if (user.fullName !== result.fullName) {
    user.fullName = result.fullName;
  }
  if (user.email !== result.email) {
    const foundUser = await Users.findOne({
      email: result.email,
    }).exec();
    if (foundUser) {
      return {
        formErrors: ["the email or username is already exist"],
        fieldErrors: {},
      };
    }
    user.email = result.email;
  }
  if (JSON.stringify(user.roles) !== JSON.stringify(result.roles)) {
    user.roles = result.roles;
  }

  await user.save();
};

export const deleteUser = async (_id: string) => {
  await dbConnect();
  await Users.deleteOne({ _id }).exec();
};

export const checkUserFound = async (email: string) => {
  await dbConnect();
  const userFound = await Users.findOne({
    email,
  });
  return !!userFound;
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const addUser = async (result: AddUserSchemaType) => {
  let hashedPass: string | undefined = undefined;
  if (result.password) hashedPass = await hashPassword(result.password);
  const userFound = await checkUserFound(result.email);

  if (userFound) {
    throw new UserExistingError();
  }
  await Users.create({
    fullName: result.fullName,
    email: result.email,
    password: hashedPass,
    roles: result.roles,
  });
};

export const signUp = async (result: SignUpSchemaType) => {
  const userFound = await checkUserFound(result.email);
  if (userFound) {
    throw new UserExistingError();
  }

  const hashedPass = await hashPassword(result.password);
  let image;
  if (result.image.size > 0) {
    const ext = path.extname(result.image.name);
    const { url } = await put(
      `/profiles/${result.email}.${ext}`,
      result.image,
      { access: "public" }
    );
    image = url;
  }
  await Users.create({
    fullName: result.fullName,
    email: result.email,
    password: hashedPass,
    role: Role.USER,
    image,
  });
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword as string);
};

export const credentialsSignIn = async (email: string, password: string) => {
  await dbConnect();

  const userFound: HydratedDocument<IUser> = await Users.findOne({
    email,
  }).exec();

  if (!userFound) return null;
  const isMatch = await comparePasswords(
    password,
    userFound.password as string
  );

  if (!isMatch) return null;

  return {
    image: userFound.image,
    fullName: userFound.fullName,
    userId: userFound._id,
    email,
    roles: userFound.roles,
  };
};

export const googleSignIn = async (
  name: string,
  email: string,
  image: string
) => {
  await dbConnect();
  const foundUser = await Users.findOne<HydratedDocument<IUser>>({
    email,
  }).exec();
  if (!foundUser) {
    const newUser: HydratedDocument<IUser> = await Users.create({
      fullName: name,
      email,
      image,
    });
    return {
      image,
      email,
      fullName: newUser.fullName,
      userId: newUser._id,
      roles: newUser.roles,
    };
  }
  return {
    image: foundUser?.image || image,
    email,
    fullName: foundUser!.fullName,
    userId: foundUser!._id,
    roles: foundUser!.roles,
  };
};
