import AddProductsForm from "@/app/_components/dashboard/Products/AddProductsForm";
import AddProductContext from "@/app/_utilities/addProductContext/addProductContext";
import { getCategoriesForOptions } from "@/lib/categoriesControllers";

export default async function Page() {
  const categories = await getCategoriesForOptions();
  return (
    <AddProductContext>
      <AddProductsForm categories={categories} />
    </AddProductContext>
  );
}
