import formatPrice from "@/app/_utilities/formatPrice";
import { getPopulatedOrderById } from "@/lib/OrderControllers";
import ChangeStatusForm from "./ChangeStatusForm";

type Props = { orderId: string };
export default async function ViewOrderHeader({ orderId }: Props) {
  const orderDetailes = await getPopulatedOrderById(orderId);
  const totalPrice = orderDetailes?.products.reduce(
    (prev, curr) =>
      prev + (curr.product.price - (curr.product.discount || 0)) * curr.qty,
    0
  );

  return (
    <table className="w-full border-[1px] table-fixed rounded-lg border-separate ">
      <tbody>
        <tr>
          <th className="p-3">order id </th>
          <th className="p-4 w-[50px]"> : </th>
          <td className="p-3 text-center">{orderDetailes?._id.toString()}</td>
        </tr>
        <tr>
          <th className="p-3">order owner </th>
          <th className="p-4"> : </th>
          <td className="p-3 text-center">{orderDetailes?.userId.fullName}</td>
        </tr>
        <tr>
          <th className="p-3">total price </th>
          <th className="p-4"> : </th>
          <td className="p-3 text-center">
            {formatPrice(totalPrice as number)}
          </td>
        </tr>
        <tr>
          <th className="p-3">status </th>
          <th className="p-4"> : </th>
          <td className="p-3">
            <ChangeStatusForm
              orderId={orderId}
              initialStatus={orderDetailes.status}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
