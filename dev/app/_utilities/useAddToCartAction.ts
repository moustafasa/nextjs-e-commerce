"use client";
import { addToCartAction } from "@/lib/CartActions";
import { useActionState } from "react";

export default function useAddToCartAction(productId: string) {
  const actionState = useActionState(
    addToCartAction.bind(undefined, productId),
    undefined
  );

  return actionState;
}
