import { Role } from "@/auth.config";
import { Types } from "mongoose";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    fullName: string;
    userId: Types.ObjectId | string;
    email: string;
    roles: Role[];
  }
  interface Session {
    user: {
      fullName: string;
      userId: Types.ObjectId | string;
      email: string;
      roles: Role[];
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    image?: string;
    fullName: string;
    userId: Types.ObjectId | string;
    email: string;
    roles: Role[];
  }
}
