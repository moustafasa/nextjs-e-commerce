import ViewOrderHeader from "@/app/(dashboardRoutes)/dashboard/orders/_components/ViewOrderHeader";
import { getOrderIds, getOrderProducts } from "@/lib/OrderControllers";
import { schema } from "../_config/orderProductSchema";
import { Suspense } from "react";
import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import ViewOrderHeaderSkeleton from "@/app/(dashboardRoutes)/dashboard/orders/_components/ViewOrderHeaderSkeleton";
import TableLayout from "@/app/_components/Table/TableLayout";
import TableHeader from "@/app/_components/Table/TableHeader";
import TableBody from "@/app/_components/Table/TableBody";

export const dynamicParams = false;

type Props = {
  params: Promise<{ orderId: string }>;
};

export default async function page({ params }: Props) {
  const pageParams = await params;
  return (
    <div className="pt-10 capitalize sm:px-10 px-2 pb-10">
      <Suspense fallback={<ViewOrderHeaderSkeleton />}>
        <ViewOrderHeader orderId={pageParams.orderId} />
      </Suspense>
      <TableLayout noSearch tableName="order products">
        <TableHeader schema={schema} />
        <Suspense fallback={<TableBodySkeleton schema={schema} />}>
          <TableBody
            schema={schema}
            data={getOrderProducts(pageParams.orderId)}
            keyIndex={"_id"}
          />
        </Suspense>
      </TableLayout>
    </div>
  );
}

export async function generateStaticParams() {
  const ordersIds = await getOrderIds();
  return ordersIds.map((order) => ({ orderId: order._id.toString() }));
}
