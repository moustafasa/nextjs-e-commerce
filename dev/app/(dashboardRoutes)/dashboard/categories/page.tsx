import {
  getCategories,
  getCategoriesMetaData,
} from "@/lib/categoriesControllers";
import { TbCategoryPlus } from "react-icons/tb";
import { type Category, schema } from "./_config/CategoriesTableSchema";
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
            data={getCategories(page ? +page : 1, search)}
            keyIndex={"_id"}
          />
        </Suspense>
      </TableLayout>
      <CustomPagination
        searchParams={searchParams}
        getMetaData={getCategoriesMetaData(search)}
      />
    </>
  );
}
