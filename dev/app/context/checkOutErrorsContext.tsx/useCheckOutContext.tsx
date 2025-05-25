import { useContext } from "react";
import { checkOutErrorsContext } from "./checkOutErrorsContext";

export default function useCheckOutContext() {
  const state = useContext(checkOutErrorsContext);
  return state;
}
