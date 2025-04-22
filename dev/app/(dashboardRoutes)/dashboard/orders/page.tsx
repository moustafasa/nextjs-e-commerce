import { getPopulatedOrders } from "@/lib/OrderControllers";
import { schema } from "./_config/orderSchema";
import { Suspense } from "react";
import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import TableLayout from "@/app/_components/Table/TableLayout";
import TableHeader from "@/app/_components/Table/TableHeader";
import TableBody from "@/app/_components/Table/TableBody";

export default async function page() {
  return (
    <TableLayout tableName="orders">
      <TableHeader schema={schema} />
      <Suspense fallback={<TableBodySkeleton schema={schema} />}>
        <TableBody
          schema={schema}
          data={getPopulatedOrders()}
          keyIndex={"_id"}
        />
      </Suspense>
    </TableLayout>
  );
}
