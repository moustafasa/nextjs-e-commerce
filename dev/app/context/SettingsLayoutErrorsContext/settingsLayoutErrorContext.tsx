"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type SettingsLayoutErrorsContext = [
  string[],
  Dispatch<SetStateAction<string[]>>
];

export const settingsLayoutErrorsContext =
  createContext<SettingsLayoutErrorsContext>([[], () => {}]);

export default function SettingsLayoutErrorsContext({
  children,
}: {
  children: ReactNode;
}) {
  const errors = useState<string[]>([]);
  return (
    <settingsLayoutErrorsContext.Provider value={errors}>
      {children}
    </settingsLayoutErrorsContext.Provider>
  );
}
