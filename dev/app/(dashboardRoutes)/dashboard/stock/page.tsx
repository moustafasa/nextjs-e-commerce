import { getCategoriesForOptions } from "@/lib/categoriesControllers";
import { getProductsForOptions } from "@/lib/productsControllers";
import AddToStockForm from "./_components/AddToStockForm";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = await getCategoriesForOptions();
  const products = await getProductsForOptions(category);

  return <AddToStockForm categories={categories} products={products} />;
}
