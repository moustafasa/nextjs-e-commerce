"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import {
  addToCart,
  changeCartProductQty,
  deleteProductFromCart,
} from "./CartControllers";
import { OutOfStockError } from "./customErrors";
import { revalidatePath } from "next/cache";

export async function addToCartAction(
  productId: string,
  state: { error?: string; submitted: boolean } | undefined,
  formData: FormData
) {
  const qty = formData.get("amount") as string | null;
  if (!qty || +qty === 0) {
    return { error: "please select the amount that you need", submitted: true };
  }
  try {
    await addToCart(productId, +qty);
    return { submitted: true };
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
    if (e instanceof OutOfStockError) {
      return { error: "this amount is out of stock", submitted: true };
    } else {
      return { error: "unknown error", submitted: true };
    }
  }
}
export async function changeCartProductQtyAction(
  productId: string,
  state: { error?: string; submitted: boolean } | undefined,
  formData: FormData
) {
  const qty = formData.get("amount") as string | null;
  if (!qty || +qty === 0)
    return { error: "please select the amount that you need", submitted: true };
  try {
    await changeCartProductQty(productId, +qty);
    return { submitted: true };
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
    if (e instanceof OutOfStockError) {
      return { error: "this amount is out of stock", submitted: true };
    }
  }
}

export async function deleteProductFromCartAction(productId: string) {
  try {
    await deleteProductFromCart(productId);
    return revalidatePath("/cart");
  } catch (e) {
    if (isRedirectError(e)) {
      throw e;
    }
  }
}
