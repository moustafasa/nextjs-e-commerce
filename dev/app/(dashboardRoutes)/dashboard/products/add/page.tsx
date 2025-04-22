import AddProductContext from "@/app/_utilities/addProductContext/addProductContext";
import { getCategoriesForOptions } from "@/lib/categoriesControllers";
import AddProductsForm from "../_components/AddProductsForm";

export default async function Page() {
  const categories = await getCategoriesForOptions();
  return (
    <AddProductContext>
      <AddProductsForm categories={categories} />
    </AddProductContext>
  );
}
