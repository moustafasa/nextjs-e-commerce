"use client";

import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export default function useThemeStorage(): [
  theme: string | null,
  setTheme: Dispatch<SetStateAction<"dark" | "light" | null>>
] {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null); // Default to light

  useLayoutEffect(() => {
    // Only run on client side
    const getInitialTheme = async () => {
      try {
        if (typeof window !== "undefined" && "cookieStore" in window) {
          const savedTheme = await window.cookieStore.get("mode");
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          const initialTheme =
            savedTheme?.value || (prefersDark ? "dark" : "light");
          setTheme(initialTheme as "dark" | "light");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // nothing to do
      }
    };
    getInitialTheme();
  }, []);

  useEffect(() => {
    const setTheme = async () => {
      if (theme) {
        const root = window.document.documentElement;
        root.dataset.theme = theme;
        await window.cookieStore.set({
          name: "mode",
          path: "/",
          value: theme,
          expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
        });
      }
    };
    setTheme();
  }, [theme]);

  return [theme, setTheme];
}
