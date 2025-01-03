import { getProductsWithCategory } from "@/lib/productsControllers";
import Image from "next/image";

type Props = { searchParams: URLSearchParams };
export default async function ProductsList({ searchParams }: Props) {
  const products = await getProductsWithCategory(
    searchParams.get("category") || undefined
  );
  return products.map((product) => (
    <li className="flex flex-col items-center" key={product._id.toString()}>
      <div className="">
        <Image
          className=""
          src={product.images[0]}
          alt={product.title}
          width={200}
          height={200}
        />
      </div>
      {product.title}
    </li>
  ));
}
