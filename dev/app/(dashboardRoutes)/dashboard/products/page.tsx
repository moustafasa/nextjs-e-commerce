import { BiSolidAddToQueue } from "react-icons/bi";
import {
  getProducts,
  getProductsWithCategoryTotal,
} from "@/lib/productsControllers";
import { type Product, schema } from "./_config/ProductsSchema";
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
      <TableLayout
        tableName="products"
        addBtn={{
          Icon: <BiSolidAddToQueue />,
          label: "add product",
          href: "/dashboard/products/add",
        }}
      >
        <TableHeader<Product> schema={schema} />
        <Suspense fallback={<TableBodySkeleton schema={schema} />}>
          <TableBody<Product>
            schema={schema}
            data={getProducts(page ? +page : 1, search)}
            keyIndex={"_id"}
          />
        </Suspense>
      </TableLayout>
      <CustomPagination
        searchParams={searchParams}
        getMetaData={getProductsWithCategoryTotal(undefined, search)}
      />
    </>
  );
}
