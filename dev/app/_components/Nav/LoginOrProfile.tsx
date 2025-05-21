import React from "react";
import SignBtns from "./SignBtns";
import Profile from "./Profile";
import { auth } from "@/auth";
import Link from "next/link";
import CartIconShow from "./CartIconShow";
import { Role } from "@/config/constants";

export default async function LoginOrProfile() {
  const session = await auth();

  return (
    <>
      {session?.user && <CartIconShow />}
      {session?.user.roles.find(
        (role) =>
          role === Role.ADMIN ||
          role === Role.ORDER_REPORTER ||
          role === Role.WRITER
      ) && (
        <Link
          className="form-button"
          href={
            session.user.roles.includes(Role.ADMIN)
              ? "/dashboard"
              : session.user.roles.includes(Role.WRITER)
              ? "/dashboard/stock"
              : "/dashboard/orders"
          }
        >
          dashboard
        </Link>
      )}
      {session?.user ? <Profile /> : <SignBtns />}
    </>
  );
}
