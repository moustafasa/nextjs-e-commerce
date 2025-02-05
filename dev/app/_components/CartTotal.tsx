import { getCartTotal } from "@/lib/CartControllers";
import formatPrice from "../_utilities/formatPrice";

export default async function CartTotal() {
  const cartTotal = await getCartTotal();
  return (
    <div className="px-20">
      <table className="w-[400px] ms-auto [&>tbody>tr>td]:text-end">
        <tbody>
          <tr className="border-b border-gray-300">
            <th className="text-start capitalize py-3 pe-4 ">total price</th>
            <td className=" py-3 px-4">{formatPrice(cartTotal.totalPrice)}</td>
          </tr>
          <tr className="border-b border-gray-300">
            <th className="text-start capitalize py-3 pe-4 ">total discount</th>
            <td className=" py-3 px-4">
              {formatPrice(cartTotal.totalDiscount)}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <th className="text-start capitalize py-3 pe-4 ">total products</th>
            <td className=" py-3 px-4">
              {cartTotal.totalProductsNumber} products
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
