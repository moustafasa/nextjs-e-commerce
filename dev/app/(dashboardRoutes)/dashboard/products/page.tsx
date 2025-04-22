import { BiSolidAddToQueue } from "react-icons/bi";
import { getProducts } from "@/lib/productsControllers";
import { type Product, schema } from "./_config/ProductsSchema";
import { Suspense } from "react";
import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import TableLayout from "@/app/_components/Table/TableLayout";
import TableHeader from "@/app/_components/Table/TableHeader";
import TableBody from "@/app/_components/Table/TableBody";

export default async function page() {
  return (
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
          data={getProducts()}
          keyIndex={"_id"}
        />
      </Suspense>
    </TableLayout>
  );
}
