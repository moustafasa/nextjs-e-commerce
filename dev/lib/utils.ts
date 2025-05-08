import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSearchRgx(search: string) {
  const esc = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(esc, "i");
  return regex;
}
