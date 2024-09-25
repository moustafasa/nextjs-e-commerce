import React, { ReactNode } from "react";
import Nav from "../components/Nav/Nav";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: ReactNode;
};
export default function layout({ children }: Props) {
  return (
    <>
      <SessionProvider>
        <Nav />
      </SessionProvider>
      {children}
    </>
  );
}
