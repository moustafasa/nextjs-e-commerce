import AddToCartCounterForm from "@/app/_components/shop-now/AddToCartCounterForm";
import PriceWithDiscount from "@/app/_components/shop-now/PriceWithDiscount";
import ProductRippon from "@/app/_components/shop-now/ProductRippon";
import { getProductByIdWithPopulation } from "@/lib/productsControllers";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ img?: string }>;
};
export default async function page({ params, searchParams }: Props) {
  const { productId } = await params;
  const queryParams = await searchParams;
  const product = await getProductByIdWithPopulation(productId);
  const imageIndex =
    queryParams.img && !isNaN(+queryParams.img) ? +queryParams.img : 0;

  if (!product) return null;
  return (
    <div className="container m-auto px-10 py-16 flex justify-around items-start ">
      <div className="flex  w-[45%] gap-3">
        <div className="border-[1px] rounded-lg block  relative text-white">
          {product.discount ? (
            <ProductRippon
              discountPercent={Math.ceil(
                (product.discount / product.price) * 100
              )}
            />
          ) : null}
          <Image
            className="object-cover "
            src={product.images[imageIndex]}
            alt="product image"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col gap-3">
          {product.images.map((img, ind) => (
            <Link
              className=" border-[1px] rounded-lg block"
              scroll={false}
              replace
              href={{ search: `?img=${ind}` }}
              key={img}
            >
              <Image
                src={img}
                alt="product image"
                width={100}
                height={100}
                className="object-cover block"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="text-white w-[45%]">
        <div>
          <span className="capitalize text-sm">{product.category.title}</span>
          <h2 className="capitalize font-bold text-3xl">{product.title}</h2>
        </div>
        <p className="my-4 capitalize">{product.descriptions}</p>
        <div className="text-xl">
          <PriceWithDiscount
            price={product.price}
            discount={product.discount}
          />
        </div>
        <span className="block capitalize text-xl font-bold my-3">
          stock: {product.stock} pieces
        </span>
        <AddToCartCounterForm productId={productId} />
      </div>
    </div>
  );
}
