import { getProductsWithCategory } from "@/lib/productsControllers";
import Image from "next/image";
import ProductRippon from "./ProductRippon";
import ProductOverLay from "./ProductOverLay";
import AddToCartModal from "./AddToCartModal";
import AddToCartModalContextProvider from "@/app/context/AddToCartModalContext/AddToCartModalContext";

type Props = {
  searchParams: Promise<{
    category?: string | string[];
    page?: string;
    search?: string;
  }>;
};
export default async function ProductsList({ searchParams }: Props) {
  const params = await searchParams;

  const products = await getProductsWithCategory(
    params.category,
    params.page ? +params.page : undefined,
    params.search
  );
  return products.map((product) => (
    <li key={product._id.toString()}>
      <AddToCartModalContextProvider>
        <div className="flex flex-col items-center p-4 gap-3 group border-gray-input border-[1px] rounded-lg relative cursor-pointer ">
          {product.discount ? (
            <ProductRippon
              discountPercent={Math.round(
                (product.discount / product.price) * 100
              )}
            />
          ) : null}
          <div className="">
            <Image
              className="aspect-square"
              src={product.images[0]}
              alt={product.title}
              width={200}
              height={200}
            />
          </div>
          <h2 className="capitalize text-xl group-hover:invisible whitespace-nowrap overflow-ellipsis max-w-full  ">
            {product.title}
          </h2>
          <ProductOverLay product={{ ...product }} />
        </div>
        <AddToCartModal
          title={product.title}
          img={product.images[0]}
          productId={product._id.toString()}
        />
      </AddToCartModalContextProvider>
    </li>
  ));
  return <div></div>;
}
