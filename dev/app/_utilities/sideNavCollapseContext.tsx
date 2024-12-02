"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type SideNavCollapseContext = [boolean, Dispatch<SetStateAction<boolean>>];

export const sideNavCollapseContext = createContext<SideNavCollapseContext>([
  false,
  () => {},
]);

export default function SideNavCollapseContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [collapse, setCollapse] = useState(false);
  console.log(collapse);

  return (
    <sideNavCollapseContext.Provider value={[collapse, setCollapse]}>
      {children}
    </sideNavCollapseContext.Provider>
  );
}
