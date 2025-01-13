import cn from "@/app/_utilities/cssConditional";
import { IProducts } from "@/models/database/Products";
import Link from "next/link";

type Props = { product: IProducts };
export default function ProductOverLay({ product }: Props) {
  return (
    <div className="absolute capitalize flex flex-col gap-3 backdrop-blur-sm invisible  justify-around p-4 bg-black-secondary-bg/70 inset-0   group-hover:visible transition-all duration-300 rounded-lg">
      <div className="space-y-5 -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h2 className="text-center text-lg">
          <span className="relative before:absolute before:w-[60%] before:h-[1px] before:bg-white before:bottom-0 before:left-[20%]">
            {product.title}
          </span>
        </h2>
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
        <span className="block ">
          price :{" "}
          <span
            className={cn("me-1 font-bold text-lg text-white", {
              "text-red-error-hover": product.discount && product.discount > 0,
            })}
          >
            &pound; {product.price - (product.discount || 0)}
          </span>{" "}
          {product.discount && product.discount > 0 ? (
            <span className="line-through text-slate-300">
              &pound; {product.price}
            </span>
          ) : null}
        </span>
        <div className="flex gap-3 mt-3 items-center justify-center">
          <form>
            <button className="form-button">add to cart</button>
          </form>
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
