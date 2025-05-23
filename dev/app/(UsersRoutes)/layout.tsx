import React, { ReactNode } from "react";
import Nav from "../_components/Nav/Nav";

type Props = {
  children: ReactNode;
};
export default async function layout({ children }: Props) {
  return (
    <div className="pb-9 pt-nav-h min-h-screen">
      <Nav />
      {children}
    </div>
  );
}
