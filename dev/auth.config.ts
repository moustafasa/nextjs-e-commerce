import { NextAuthConfig } from "next-auth";
import { roles } from "./models/database/Users";
import Credentials from "next-auth/providers/credentials";
import Users, { IUser } from "./models/database/Users";
import dbConnect from "./config/dbConnect";
import bcrypt from "bcryptjs";
import { HydratedDocument } from "mongoose";
import Google from "next-auth/providers/google";

export const authConfig = {
  pages: { signIn: "/sign-in" },
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

        console.log(image);
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
          fullName: foundUser.fullName,
          userId: foundUser._id,
          roles: foundUser.roles,
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
          fullName: userFound.fullName,
          userId: userFound._id,
          email,
          roles: userFound.roles,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.image = user.image as string | undefined;
        token.fullName = user.fullName;
        token.userId = user.userId;
        token.email = user.email as string;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.image = token.image;
      session.user.fullName = token.fullName;
      session.user.userId = token.userId;
      session.user.email = token.email;
      session.user.roles = token.roles;
      return session;
    },
    async authorized({ request, auth }) {
      const openedPaths = ["/", "/contact", "/about", "/sign-in", "/sign-up"];
      if (!openedPaths.includes(request.nextUrl.pathname) && !auth?.user) {
        return false;
      }

      if (request.nextUrl.pathname.startsWith("/dashboard")) {
        if (auth?.user.roles.includes(roles.ADMIN)) {
          return true;
        }
        if (
          auth?.user.roles.includes(roles.ORDER_REPORTER) &&
          request.nextUrl.pathname === "/dashboard/orders"
        ) {
          return true;
        }
        if (
          auth?.user.roles.includes(roles.WRITER) &&
          request.nextUrl.pathname === "/dashboard/entries"
        ) {
          return true;
        }
        return false;
      }

      if (request.nextUrl.pathname === "/sign-in" && auth?.user) {
        if (auth.user.roles.includes(roles.ADMIN)) {
          return Response.redirect(new URL("/dashboard", request.url));
        }
        if (auth.user.roles.includes(roles.ORDER_REPORTER)) {
          return Response.redirect(new URL("/dashboard/orders", request.url));
        }
        if (auth.user.roles.includes(roles.WRITER)) {
          return Response.redirect(new URL("/dashboard/entries", request.url));
        }
        if (auth.user.roles.includes(roles.USER)) {
          return Response.redirect(new URL("/shop-now", request.url));
        }
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
