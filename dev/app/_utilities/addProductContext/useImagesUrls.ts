"use client";
import { useContext } from "react";
import { addProductContext } from "./addProductContext";

export default function useImagesUrls() {
  const { imagesUrls } = useContext(addProductContext);
  return imagesUrls;
}
