import TableBody from "@/app/_components/dashboard/Table/TableBody";
import TableHeader from "@/app/_components/dashboard/Table/TableHeader";
import TableLayout from "@/app/_components/dashboard/Table/TableLayout";
import { getCategories } from "@/lib/categoriesControllers";
import { ICategories } from "@/models/database/Categories";
import Image from "next/image";
import { TbCategoryPlus } from "react-icons/tb";
import OptionsBtn from "@/app/_components/dashboard/Table/OptionsBtn";
import { deleteCategoryAction } from "@/lib/categoriesActions";

type Category = ICategories & { _id: string };

export default async function page() {
  const schema = [
    {
      id: "title",
      getData(data) {
        return data;
      },
    },
    {
      id: "image",
      getData(data) {
        return (
          <div className="flex items-center justify-center p-3">
            <Image src={data} alt="image" width={100} height={100} />
          </div>
        );
      },
    },
    {
      id: "_id",
      label: "options",
      getData(data) {
        return (
          <OptionsBtn
            id={data}
            basePath="dashboard/categories"
            deleteAction={deleteCategoryAction}
          />
        );
      },
    },
  ] satisfies TableSchema<Category>[];

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
      <TableBody<Category>
        schema={schema}
        data={getCategories()}
        keyIndex={"_id"}
      />
    </TableLayout>
  );
}
