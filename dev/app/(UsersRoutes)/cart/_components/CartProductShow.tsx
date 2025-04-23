import Image from "next/image";
import { IProductsWithCategory } from "@/app/(UsersRoutes)/cart/_types/types";
import ProductRippon from "../../shop-now/_components/ProductRippon";
import PriceWithDiscount from "../../shop-now/_components/PriceWithDiscount";

type Props = {
  data: IProductsWithCategory;
};

export default function CartProductShow({ data }: Props) {
  return (
    <div className="flex gap-3 py-4 ps-5 w-max">
      <div className="relative bg-black-tertiery-bg p-3 rounded-lg shadow-lg flex-shrink-0">
        <ProductRippon discountPercent={50} />
        <Image
          className="w-[150px] h-[150px] block flex-shrink-0 object-cover"
          src={data.images[0]}
          alt="product image"
          width={150}
          height={150}
        />
      </div>
      <div className="flex flex-col items-start  gap-5 flex-shrink-0">
        <div className="flex flex-col items-start flex-shrink-0">
          <span>{data.category.title}</span>
          <h2 className=" capitalize text-xl font-bold">{data.title}</h2>
        </div>
        <PriceWithDiscount price={data.price} discount={data.discount} />
      </div>
    </div>
  );
}
