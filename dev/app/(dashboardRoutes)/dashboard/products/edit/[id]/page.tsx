import AddProductContext from "@/app/_utilities/addProductContext/addProductContext";
import { getCategoriesForOptions } from "@/lib/categoriesControllers";
import { getProductById, getProductsIds } from "@/lib/productsControllers";
import { notFound } from "next/navigation";
import EditProductsForm from "../../_components/EditProductsForm";

export const dynamicParams = false;

type Props = { params: Promise<{ id: string }> };
export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    notFound();
  }
  const categories = await getCategoriesForOptions();
  const convertedProduct = product.toObject({ flattenObjectIds: true });
  return (
    <AddProductContext>
      <EditProductsForm categories={categories} product={convertedProduct} />
    </AddProductContext>
  );
}

export const generateStaticParams = async () => {
  const productsIds = await getProductsIds();
  return productsIds.map((product) => ({ id: product._id.toString() }));
};
