import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Users, { IUser } from "./models/database/Users";
import dbConnect from "./config/dbConnect";
import bcrypt from "bcryptjs";
import { type HydratedDocument } from "mongoose";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile) {
        const {
          name,
          email,
          picture: image,
        } = profile as {
          name: string;
          email: string;
          picture: string;
        };
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
          image,
          email,
          fullName: foundUser!.fullName,
          userId: foundUser!._id,
          roles: foundUser!.roles,
        };
      },
    }),
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await dbConnect();
        } catch (err) {
          throw err;
        }
        const userFound: HydratedDocument<IUser> = await Users.findOne({
          email,
        }).exec();
        if (!userFound) return null;
        const isMatch = await bcrypt.compare(
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
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.image = user.image as string | undefined;
        token.fullName = user.fullName;
        token.userId = user.userId;
        token.email = user.email as string;
        token.roles = user.roles;
      }
      return token;
    },
    session({ token, session }) {
      session.user.image = token.image;
      session.user.fullName = token.fullName;
      session.user.userId = token.userId;
      session.user.email = token.email;
      session.user.roles = token.roles;
      return session;
    },
  },
});
