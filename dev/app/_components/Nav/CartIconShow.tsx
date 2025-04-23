import { getCartQuantity } from "@/lib/CartControllers";
import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

export default async function CartIconShow() {
  const cart = await getCartQuantity();

  return (
    <Link href={"/cart"} className="block relative">
      {!!cart && (
        <span className="absolute text-xs -left-1 -top-1 -translate-x-1/2 -translate-y-1/2 bg-red-error-hover flex justify-center items-center rounded-full p-1 w-4 h-4">
          {cart}
        </span>
      )}
      <FaCartShopping />
    </Link>
  );
}
