import { NextAuthConfig } from "next-auth";
import { Role } from "./config/constants";
import { NextResponse } from "next/server";

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
          [
            "/dashboard/stock",
            "/dashboard/categories",
            "/dashboard/products",
          ].find((url) => request.nextUrl.pathname.startsWith(url))
        ) {
          return true;
        }
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }

      if (request.nextUrl.pathname === "/sign-in" && auth?.user) {
        const callBack = request.nextUrl.searchParams.get("callbackUrl");
        if (callBack) {
          return NextResponse.redirect(callBack);
        }
        if (auth.user.roles.includes(Role.ADMIN)) {
          return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        if (auth.user.roles.includes(Role.ORDER_REPORTER)) {
          return NextResponse.redirect(
            new URL("/dashboard/orders", request.url)
          );
        }
        if (auth.user.roles.includes(Role.WRITER)) {
          return NextResponse.redirect(
            new URL("/dashboard/stock", request.url)
          );
        }
        if (auth.user.roles.includes(Role.USER)) {
          return NextResponse.redirect(new URL("/shop-now", request.url));
        }
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
