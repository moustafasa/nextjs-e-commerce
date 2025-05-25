"use client";
import { createContext, useState } from "react";

type initialState = [
  errors: Record<string, string>[],
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>[]>>
];

const initialState: initialState = [[], () => {}];

export const checkOutErrorsContext = createContext<initialState>(initialState);

export default function CheckOutErrorsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const state = useState<Record<string, string>[]>([]);

  return (
    <checkOutErrorsContext.Provider value={state}>
      {children}
    </checkOutErrorsContext.Provider>
  );
}
