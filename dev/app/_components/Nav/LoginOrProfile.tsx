import React from "react";
import SignBtns from "./SignBtns";
import Profile from "./Profile";
import { auth } from "@/auth";
import Link from "next/link";
import { Role } from "@/auth.config";

export default async function LoginOrProfile() {
  const session = await auth();

  return (
    <div className="ms-auto lg:ms-0 flex items-center gap-3">
      {session?.user.roles.find(
        (role) =>
          role === Role.ADMIN ||
          role === Role.ORDER_REPORTER ||
          role === Role.WRITER
      ) && (
        <Link className="form-button" href={"/dashboard"}>
          dashboard
        </Link>
      )}
      {session?.user ? <Profile /> : <SignBtns />}
    </div>
  );
}
