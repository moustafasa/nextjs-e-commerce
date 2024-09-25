import React from "react";
import SignBtns from "./SignBtns";
import Profile from "./Profile";
import { auth } from "@/auth";

export default async function LoginOrProfile() {
  const session = await auth();
  return (
    <div className="ms-auto lg:ms-0">
      {session?.user ? <Profile /> : <SignBtns />}
    </div>
  );
}
