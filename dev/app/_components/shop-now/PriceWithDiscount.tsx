import formatPrice from "@/app/_utilities/formatPrice";
import { cn } from "@/lib/utils";

type Props = { price: number; discount?: number };
export default function PriceWithDiscount({ price, discount }: Props) {
  return (
    <span className="block capitalize font-bold ">
      price :{" "}
      <span
        className={cn("me-1 font-bold text-lg text-white", {
          "text-red-error-hover": discount && discount > 0,
        })}
      >
        {formatPrice(price - (discount || 0))}
      </span>{" "}
      {discount && discount > 0 ? (
        <span className="line-through text-slate-300">
          {formatPrice(price)}
        </span>
      ) : null}
    </span>
  );
}
