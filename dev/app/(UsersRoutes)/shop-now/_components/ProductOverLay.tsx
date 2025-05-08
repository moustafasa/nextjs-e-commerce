import { IProducts } from "@/models/database/Products";
import Link from "next/link";
import QuickAddToCartButton from "./QuickAddToCartButton";
import PriceWithDiscount from "./PriceWithDiscount";
import PageHeader from "@/app/_components/PageHeader";

type Props = { product: IProducts };
export default function ProductOverLay({ product }: Props) {
  return (
    <div className="absolute capitalize flex flex-col gap-3 backdrop-blur-sm invisible  justify-around p-4 bg-slate-100/60 dark:bg-black-secondary-bg/70 inset-0 group-hover:visible transition-all duration-300 rounded-lg">
      <div className="space-y-5 -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <PageHeader title={product.title} className="text-lg" />
        <div className="text-sm">
          <p
            className="text-ellipsis overflow-hidden line-clamp-3 "
            title={product.descriptions}
          >
            {product.descriptions} Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Fugiat cumque iure, quo autem excepturi pariatur.
            Omnis adipisci, quibusdam rem ullam ipsum nam, nemo expedita
            excepturi quo recusandae eius consequuntur quia.
          </p>
        </div>
      </div>
      <div className="group-hover:translate-y-0 transition-transform duration-300 translate-y-4">
        <PriceWithDiscount price={product.price} discount={product.discount} />
        <div className="flex gap-3 mt-3 items-center justify-center">
          <QuickAddToCartButton />
          <Link
            className="form-button"
            href={`/shop-now/${product._id.toString()}`}
          >
            view
          </Link>
        </div>
      </div>
    </div>
  );
}
