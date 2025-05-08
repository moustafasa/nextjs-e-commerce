"use client";

import {
  type Dispatch,
  type SetStateAction,
  useLayoutEffect,
  useState,
} from "react";

export default function useThemeStorage(): [
  theme: string,
  setTheme: Dispatch<SetStateAction<"dark" | "light">>
] {
  const [theme, setTheme] = useState<"dark" | "light">("dark"); // Default to light

  useLayoutEffect(() => {
    // Only run on client side
    const savedTheme = localStorage?.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme as "dark" | "light");

    const root = window.document.documentElement;
    root.dataset.theme = initialTheme;
  }, []);

  useLayoutEffect(() => {
    const root = window.document.documentElement;
    root.dataset.theme = theme;
    localStorage?.setItem("theme", theme);
  }, [theme]);

  return [theme, setTheme];
}
