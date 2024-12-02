"use client";
import { useContext } from "react";
import { addProductContext } from "./addProductContext";

export default function useProductIdContext() {
  const { id } = useContext(addProductContext);
  return id;
}
