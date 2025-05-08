"use client";

import useThemeStorage from "../_utilities/useThemeStorage";

type Props = { children: React.ReactNode };
export default function HTMLComponent({ children }: Props) {
  useThemeStorage();
  return <html lang="en">{children}</html>;
}
