import { useContext } from "react";
import { addToCartModalContext } from "./AddToCartModalContext";

export default function useAddToCartModalContext() {
  const isOpenContext = useContext(addToCartModalContext);
  return isOpenContext;
}
