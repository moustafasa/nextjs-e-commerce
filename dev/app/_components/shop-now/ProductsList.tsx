import { getProductsWithCategory } from "@/lib/productsControllers";
import Image from "next/image";
import ProductRippon from "./ProductRippon";
import ProductOverLay from "./ProductOverLay";

type Props = {
  searchParams: Promise<{ category?: string[] }>;
};
export default async function ProductsList({ searchParams }: Props) {
  const params = await searchParams;
  const products = await getProductsWithCategory(params.category);
  return products.map((product) => (
    <li
      key={product._id.toString()}
      className="flex flex-col items-center p-4 gap-3 group border-gray-input border-[1px] rounded-lg relative cursor-pointer "
    >
      {product.discount ? (
        <ProductRippon
          discountPercent={Math.round((product.discount / product.price) * 100)}
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
      <h2 className="capitalize text-xl group-hover:invisible  ">
        {product.title}
      </h2>
      <ProductOverLay product={product} />
    </li>
  ));
}
