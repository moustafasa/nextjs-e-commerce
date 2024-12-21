import AddToStockForm from "@/app/_components/dashboard/AddToStock/AddToStockForm";
import { getCategoriesForOptions } from "@/lib/categoriesControllers";
import { getProductsForOptions } from "@/lib/productsControllers";

export default async function page({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categories = await getCategoriesForOptions();
  const products = await getProductsForOptions(searchParams.category);

  return <AddToStockForm categories={categories} products={products} />;
}
