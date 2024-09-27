import { NextAuthConfig } from "next-auth";

export const roles = {
  ADMIN: 1000,
  USER: 2500,
  WRITER: 3000,
  ORDER_REPORTER: 4000,
} as const;

export const authConfig = {
  pages: { signIn: "/sign-in" },
  providers: [],

  callbacks: {
    session({ token, session }) {
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
