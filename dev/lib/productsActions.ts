"use server";
import addProductSchema, {
  AddProductFlattenedError,
} from "@/models/zodSchemas/Product/addProductsSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addProduct } from "./productsControllers";
import { ProductExistingError } from "./customErrors";

export const addProductsAction = async (
  prevState: AddProductFlattenedError | undefined,
  formData: FormData
) => {
  const registeredData = Object.fromEntries(formData);
  console.log(registeredData);
  const result = addProductSchema.safeParse({ ...registeredData });
  if (!result.success) {
    return result.error.flatten();
  }
  try {
    await addProduct(result.data);
  } catch (err) {
    if (err instanceof ProductExistingError) {
      return {
        formErrors: ["this product is already found"],
        fieldErrors: {},
      };
    }
    console.log(err);
    return { formErrors: ["network error"], fieldErrors: {} };
  }
  // revalidatePath("/dashboard/products");
  // redirect("/dashboard/products");
};
