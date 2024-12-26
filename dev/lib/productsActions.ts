"use server";
import editProductSchema, {
  EditProductFlattenedError,
} from "./../models/zodSchemas/Product/editProductsSchema";
import addProductSchema, {
  AddProductFlattenedError,
} from "@/models/zodSchemas/Product/addProductsSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addProduct,
  addToStock,
  deleteProduct,
  deleteProductImage,
  editProduct,
} from "./productsControllers";
import {
  ProductExistingError,
  ProductImagesBelowLimitError,
} from "./customErrors";
import {
  AddToStockFlattenedError,
  addToStockSchema,
} from "@/models/zodSchemas/Product/addToStockSchema";

export const addProductsAction = async (
  prevState: AddProductFlattenedError | undefined,
  formData: FormData
) => {
  const registeredData = Object.fromEntries(formData);
  const result = addProductSchema.safeParse({ ...registeredData });
  if (!result.success) {
    return result.error.flatten();
  }
  try {
    await addProduct(result.data);
  } catch (err) {
    if (err instanceof ProductExistingError) {
      return {
        formErrors: ["this product is already found in this category"],
        fieldErrors: {},
      };
    }
    return { formErrors: ["network error"], fieldErrors: {} };
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const editProductAction = async (
  id: string,
  prevState: EditProductFlattenedError | undefined,
  formData: FormData
) => {
  const registeredData = Object.fromEntries(formData);
  const result = editProductSchema.safeParse(registeredData);
  if (!result.success) {
    return result.error.flatten();
  }

  try {
    await editProduct(id, result.data);
  } catch (err) {
    if (err instanceof ProductExistingError) {
      return {
        formErrors: ["this product is already found in this category"],
        fieldErrors: {},
      };
    }
    if (err instanceof ProductImagesBelowLimitError) {
      return {
        formErrors: [],
        fieldErrors: {
          images: ["you should choose at least three images"],
        },
      };
    }
    return { formErrors: ["network error"], fieldErrors: {} };
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteProductImageAction = async (url: string) => {
  await deleteProductImage(url);
};

export async function deleteProductAction(_id: string) {
  try {
    await deleteProduct(_id);
  } catch (err) {
    throw err;
  }
  revalidatePath("/dashboard/products");
}

export async function addToStockAction(
  prevState: AddToStockFlattenedError | undefined,
  formData: FormData
) {
  const registeredData = Object.fromEntries(formData);
  const result = addToStockSchema.safeParse(registeredData);
  if (!result.success) {
    return result.error.flatten();
  }
  try {
    await addToStock(result.data);
  } catch (err) {
    throw err;
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
