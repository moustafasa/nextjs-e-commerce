import React, { ReactNode } from "react";
import Nav from "../components/Nav/Nav";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

type Props = {
  children: ReactNode;
};
export default async function layout({ children }: Props) {
  const test = await auth();
  console.log(test);
  return (
    <>
      <SessionProvider>
        <Nav />
      </SessionProvider>
      {children}
    </>
  );
}
