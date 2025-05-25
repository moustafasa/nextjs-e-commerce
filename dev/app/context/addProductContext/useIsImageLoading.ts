"use client";
import { useContext } from "react";
import { addProductContext } from "./addProductContext";

export default function useIsImageLoading() {
  const { isLoading } = useContext(addProductContext);
  return isLoading;
}
