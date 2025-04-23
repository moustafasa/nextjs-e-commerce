import CheckoutForm from "@/app/(UsersRoutes)/cart/_components/checkoutForm";
import CartTotal from "@/app/_components/CartTotal";
import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import { getCartProducts, getCartQuantity } from "@/lib/CartControllers";
import { Suspense } from "react";
import TableLayout from "@/app/_components/Table/TableLayout";
import TableHeader from "@/app/_components/Table/TableHeader";
import TableBody from "@/app/_components/Table/TableBody";
import schema from "./_config/Schema";
import { CartSchema } from "./_types/types";

export default async function page() {
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
