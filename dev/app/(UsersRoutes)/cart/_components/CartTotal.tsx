import { getCartTotal } from "@/lib/CartControllers";
import formatPrice from "@/app/_utilities/formatPrice";

export default async function CartTotal() {
  const cartTotal = await getCartTotal();
  return (
    <div className="md:px-20 px-3">
      <table className="md:w-[400px] w-full ms-auto [&>tbody>tr>td]:text-end">
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
