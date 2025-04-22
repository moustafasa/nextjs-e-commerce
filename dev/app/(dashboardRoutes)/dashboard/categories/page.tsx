import { getCategories } from "@/lib/categoriesControllers";
import { TbCategoryPlus } from "react-icons/tb";
import { type Category, schema } from "./_config/CategoriesTableSchema";
import { Suspense } from "react";
import TableBodySkeleton from "@/app/_components/skeletons/TableBodySkeleton";
import TableLayout from "@/app/_components/Table/TableLayout";
import TableHeader from "@/app/_components/Table/TableHeader";
import TableBody from "@/app/_components/Table/TableBody";

export default async function page() {
  return (
    <TableLayout
      tableName="categories"
      addBtn={{
        Icon: <TbCategoryPlus />,
        label: "add category",
        href: "/dashboard/categories/add",
      }}
    >
      <TableHeader<Category> schema={schema} />
      <Suspense fallback={<TableBodySkeleton<Category> schema={schema} />}>
        <TableBody<Category>
          schema={schema}
          data={getCategories()}
          keyIndex={"_id"}
        />
      </Suspense>
    </TableLayout>
  );
}
