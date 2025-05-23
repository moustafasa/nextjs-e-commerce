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
    <div className="w-full border-[1px] p-3 grid grid-flow-cols grid-cols-[auto_auto_1fr] overflow-auto">
      <div className="grid grid-cols-subgrid col-span-3 items-center">
        <span className="sm:p-3 p-2 whitespace-nowrap ">order id </span>
        <span className="sm:p-3 p-2"> : </span>
        <span className="sm:p-3 p-2 sm:text-center">
          {orderDetailes?._id.toString()}
        </span>
      </div>
      <div className="grid grid-cols-subgrid col-span-3 items-center">
        <span className="sm:p-3 p-2 whitespace-nowrap">order owner </span>
        <span className="sm:p-3 p-2"> : </span>
        <span className="sm:p-3 p-2 sm:text-center">
          {orderDetailes?.userId.fullName}
        </span>
      </div>
      <div className="grid grid-cols-subgrid col-span-3 items-center">
        <span className="sm:p-3 p-2 whitespace-nowrap">total price </span>
        <span className="sm:p-3 p-2"> : </span>
        <span className="sm:p-3 p-2 sm:text-center">
          {formatPrice(totalPrice as number)}
        </span>
      </div>
      <div className="grid grid-cols-subgrid col-span-3 items-center">
        <span className="sm:p-3 p-2 whitespace-nowrap">status </span>
        <span className="sm:p-3 p-2"> : </span>
        <div className="sm:p-3 p-2 sm:text-center">
          <ChangeStatusForm
            orderId={orderId}
            initialStatus={orderDetailes.status}
          />
        </div>
      </div>
    </div>
  );
}
