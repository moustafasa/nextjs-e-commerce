"use client";
import { useContext } from "react";
import { addProductContext } from "./addProductContext";

export default function useIsImageLoading() {
  const { loadingQueue } = useContext(addProductContext);
  return loadingQueue;
}
