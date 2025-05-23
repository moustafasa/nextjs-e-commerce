import { getOrdersMeta, getPopulatedOrders } from "@/lib/OrderControllers";
import { schema } from "./_config/orderSchema";
import { Suspense } from "react";
import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import TableLayout from "@/app/_components/Table/TableLayout";
import TableHeader from "@/app/_components/Table/TableHeader";
import TableBody from "@/app/_components/Table/TableBody";
import CustomPagination from "@/app/_components/CustomPagination";

type Props = {
  searchParams: Promise<{ page?: string; search?: string }>;
};
export default async function page({ searchParams }: Props) {
  const { page, search } = await searchParams;
  return (
    <>
      <TableLayout tableName="orders">
        <TableHeader schema={schema} />
        <Suspense fallback={<TableBodySkeleton schema={schema} />}>
          <TableBody
            schema={schema}
            data={getPopulatedOrders(page ? +page : 1, search)}
            keyIndex={"_id"}
          />
        </Suspense>
      </TableLayout>
      <CustomPagination
        searchParams={searchParams}
        getMetaData={getOrdersMeta(search)}
      />
    </>
  );
}
