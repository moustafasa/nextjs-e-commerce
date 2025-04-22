import ChangeProductQty from "@/app/(UsersRoutes)/cart/_components/ChangeProductQty";
import CheckoutForm from "@/app/(UsersRoutes)/cart/_components/checkoutForm";
import CartTotal from "@/app/_components/CartTotal";
import Skeleton from "@/app/_components/skeletons/Skeleton";
import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import formatPrice from "@/app/_utilities/formatPrice";
import { getCartProducts, getCartQuantity } from "@/lib/CartControllers";
import { Suspense } from "react";
import { IProductsWithCategory } from "./_types/types";
import CartProductShow from "@/app/(UsersRoutes)/cart/_components/CartProductShow";
import TableLayout from "@/app/_components/Table/TableLayout";
import TableHeader from "@/app/_components/Table/TableHeader";
import TableBody from "@/app/_components/Table/TableBody";

type CartSchema = {
  _id: string;
  qty: number;
  product: IProductsWithCategory;
};
export default async function page() {
  const schema = [
    {
      id: "product",
      getData(data) {
        return <CartProductShow data={data as IProductsWithCategory} />;
      },
      skeletonData: () => (
        <div className="flex gap-3 py-4 ps-5 w-max">
          <div className="relative bg-black-tertiery-bg p-3 rounded-lg shadow-lg flex-shrink-0">
            <Skeleton classNames="sk-image !h-[150px] !w-[150px] flex-shrink-0" />
          </div>
          <div className="flex flex-col items-start  gap-5 flex-shrink-0">
            <div className="flex flex-col items-start flex-shrink-0 gap-1 ">
              <Skeleton classNames="sk-text w-20" />
              <Skeleton classNames="sk-header w-40" />
            </div>
            <Skeleton classNames="sk-text w-52" />
          </div>
        </div>
      ),
    },

    {
      id: "qty",
      getData(data, row) {
        return (
          <ChangeProductQty
            qty={data as number}
            stockNumber={row.product.stock || 0}
            productId={row.product._id.toString()}
          />
        );
      },
      skeletonData() {
        return <Skeleton classNames="sk-button !w-28" />;
      },
    },
    {
      id: "product",
      label: "total price",
      getData(data, row) {
        return (
          <span className="text-xl font-bold px-3">
            {formatPrice((data as IProductsWithCategory).price * row.qty)}
          </span>
        );
      },
    },
  ] satisfies TableSchema<CartSchema>[];

  const numberOfCarts = await getCartQuantity();
  return (
    <>
      <TableLayout tableName="your shoping cart">
        <TableHeader<CartSchema> noId schema={schema} />
        <Suspense
          fallback={
            <TableBodySkeleton
              schema={schema}
              zepraBg={false}
              noId
              specificNumber={numberOfCarts || undefined}
            />
          }
        >
          <TableBody<CartSchema>
            schema={schema}
            data={getCartProducts()}
            keyIndex="_id"
            zepraBg={false}
            noId
          />
        </Suspense>
      </TableLayout>
      <CartTotal />
      <CheckoutForm />
    </>
  );
}
