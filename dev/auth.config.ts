import { NextAuthConfig } from "next-auth";

export enum Role {
  // eslint-disable-next-line no-unused-vars
  ADMIN = 1000,
  // eslint-disable-next-line no-unused-vars
  USER = 2500,
  // eslint-disable-next-line no-unused-vars
  WRITER = 3000,
  // eslint-disable-next-line no-unused-vars
  ORDER_REPORTER = 4000,
}

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
        if (auth?.user.roles.includes(Role.ADMIN)) {
          return true;
        }
        if (
          auth?.user.roles.includes(Role.ORDER_REPORTER) &&
          request.nextUrl.pathname === "/dashboard/orders"
        ) {
          return true;
        }
        if (
          auth?.user.roles.includes(Role.WRITER) &&
          request.nextUrl.pathname === "/dashboard/entries"
        ) {
          return true;
        }
        return Response.redirect(new URL("/unauthorized", request.url));
      }

      if (request.nextUrl.pathname === "/sign-in" && auth?.user) {
        if (auth.user.roles.includes(Role.ADMIN)) {
          return Response.redirect(new URL("/dashboard", request.url));
        }
        if (auth.user.roles.includes(Role.ORDER_REPORTER)) {
          return Response.redirect(new URL("/dashboard/orders", request.url));
        }
        if (auth.user.roles.includes(Role.WRITER)) {
          return Response.redirect(new URL("/dashboard/entries", request.url));
        }
        if (auth.user.roles.includes(Role.USER)) {
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
