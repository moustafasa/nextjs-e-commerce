import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { credentialsSignIn, googleSignIn } from "./lib/usersControllers";

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

        const auth = await googleSignIn(name, email, image);

        return auth;
      },
    }),

    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const auth = await credentialsSignIn(email, password);
        return auth;
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
