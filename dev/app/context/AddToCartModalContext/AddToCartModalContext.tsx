"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type AddToCartModalContext = [boolean, Dispatch<SetStateAction<boolean>>];

export const addToCartModalContext = createContext<AddToCartModalContext>([
  false,
  () => {},
]);

export default function AddToCartModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <addToCartModalContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </addToCartModalContext.Provider>
  );
}
