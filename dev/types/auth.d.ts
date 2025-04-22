import { type Role } from "@/config/constants";
import { Types } from "mongoose";
import { Account, DefaultSession } from "next-auth";
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    fullName: string;
    userId: Types.ObjectId | string;
    email: string;
    roles: Role[];
    image?: string;
  }
  interface Session {
    user: {
      fullName: string;
      userId: Types.ObjectId | string;
      email: string;
      roles: Role[];
      image?: string;
    } & DefaultSession["user"];
    provider: Account["provider"] | "credentials";
  }
  interface Account {
    provider: "google" | undefined;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    image?: string;
    fullName: string;
    userId: Types.ObjectId | string;
    email: string;
    roles: Role[];
    provider: Account["provider"] | "credentials";
  }
}
