import addProductSchema, {
  AddProductFlattenedError,
} from "@/models/zodSchemas/Product/addProductsSchema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addProductsAction = async (
  prevState: AddProductFlattenedError | undefined,
  formData: FormData
) => {
  const registeredData = Object.fromEntries(formData);
  const result = addProductSchema.safeParse(registeredData);
  if (!result.success) {
    return result.error.flatten();
  }

  //   try {
  //     await addCategory(result.data);
  //   } catch (err) {
  //     if (err instanceof CategoryExistingError) {
  //       return {
  //         formErrors: ["this category is already found"],
  //         fieldErrors: {},
  //       };
  //     }
  //     return { formErrors: ["network error"], fieldErrors: {} };
  //   }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};
