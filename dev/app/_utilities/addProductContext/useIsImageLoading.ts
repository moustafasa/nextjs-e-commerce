"use client";
import { useContext } from "react";
import { addProductContext } from "./addProductContext";

export default function useIsImageLoading() {
  const { isImageLoading } = useContext(addProductContext);
  return isImageLoading;
}
