import EditProductsForm from "@/app/_components/dashboard/Products/EditProductsForm";
import AddProductContext from "@/app/_utilities/addProductContext/addProductContext";
import { getCategoriesForOptions } from "@/lib/categoriesControllers";
import { getProductById } from "@/lib/productsControllers";
import { notFound } from "next/navigation";

export const dynamicParams = false;

type Props = { params: { id: string } };
export default async function Page({ params: { id } }: Props) {
  const product = await getProductById(id);
  if (!product) {
    notFound();
  }
  const categories = await getCategoriesForOptions();
  const convertedProduct = product.toObject();
  return (
    <AddProductContext>
      <EditProductsForm categories={categories} product={convertedProduct} />
    </AddProductContext>
  );
}

// export const generateStaticParams = async () => {
//   await dbConnect();
//   const usersIds = await getUsersIds();
//   return usersIds.map((id) => ({ params: { id } }));
// };
