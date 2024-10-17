"use server";

import addCategorySchema, {
  AddCategoryFlattenedError,
} from "@/models/zodSchemas/Category/addCategorySchema";
import {
  addCategory,
  deleteCategory,
  editCategory,
} from "./categoriesControllers";
import { CategoryExistingError } from "./customErrors";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import editCategorySchema, {
  EditCategoryFlattenedError,
} from "@/models/zodSchemas/Category/editCategorySchema";

export const addCategoryAction = async (
  prevState: AddCategoryFlattenedError | undefined,
  formData: FormData
) => {
  const registeredData = Object.fromEntries(formData);
  const result = addCategorySchema.safeParse(registeredData);
  if (!result.success) {
    return result.error.flatten();
  }

  try {
    await addCategory(result.data);
  } catch (err) {
    if (err instanceof CategoryExistingError) {
      return {
        formErrors: ["this category is already found"],
        fieldErrors: {},
      };
    }
    return { formErrors: ["network error"], fieldErrors: {} };
  }
  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
};
export const editCategoryAction = async (
  id: string,
  prevState: EditCategoryFlattenedError | undefined,
  formData: FormData
) => {
  const registeredData = Object.fromEntries(formData);
  const result = editCategorySchema.safeParse(registeredData);
  if (!result.success) {
    return result.error.flatten();
  }

  try {
    await editCategory(id, result.data);
  } catch (err) {
    if (err instanceof CategoryExistingError) {
      return {
        formErrors: ["this category is already found"],
        fieldErrors: {},
      };
    }
    return { formErrors: ["network error"], fieldErrors: {} };
  }
  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
};

export async function deleteCategoryAction(_id: string) {
  try {
    await deleteCategory(_id);
  } catch (err) {
    console.log(err);
    throw err;
  }
  revalidatePath("/dashboard/categories");
}
