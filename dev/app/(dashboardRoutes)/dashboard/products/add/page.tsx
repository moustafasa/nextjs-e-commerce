import AddProductsForm from "@/app/_components/dashboard/Products/AddProductsForm";
import AddProductContext from "@/app/_utilities/addProductContext/addProductContext";
import { getCategories } from "@/lib/categoriesControllers";
import { randomUUID } from "crypto";

export default async function Page() {
  const categories = await getCategories();
  const id = randomUUID();
  return (
    <AddProductContext id={id}>
      <AddProductsForm categories={categories} />
    </AddProductContext>
  );
}
