import CheckoutForm from "@/app/(UsersRoutes)/cart/_components/checkoutForm";
import CartTotal from "@/app/(UsersRoutes)/cart/_components/CartTotal";
import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import { getCartProducts, getCartQuantity } from "@/lib/CartControllers";
import { Suspense } from "react";
import TableLayout from "@/app/_components/Table/TableLayout";
import TableHeader from "@/app/_components/Table/TableHeader";
import TableBody from "@/app/_components/Table/TableBody";
import schema from "./_config/Schema";
import { CartSchema } from "./_types/types";
import CartTotalSk from "./_components/CartTotalSk";
import Link from "next/link";
import CheckOutErrorsProvider from "@/app/context/checkOutErrorsContext.tsx/checkOutErrorsContext";

export default async function page() {
  const numberOfCarts = await getCartQuantity();
  if (!numberOfCarts) {
    return (
      <TableLayout noSearch tableName="your shoping cart">
        <tbody className="">
          <tr>
            <td className="p-3 text-3xl leading-relaxed">
              no products added to your cart yet <br />
              <Link href={"/shop-now"}>go to shoping 👉</Link>
            </td>
          </tr>
        </tbody>
      </TableLayout>
    );
  }
  return (
    <CheckOutErrorsProvider>
      <TableLayout noSearch tableName="your shoping cart">
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
      <Suspense fallback={<CartTotalSk />}>
        <CartTotal />
      </Suspense>
      <CheckoutForm />
    </CheckOutErrorsProvider>
  );
}
