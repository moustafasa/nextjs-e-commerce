import TableHeader from "@/app/_components/dashboard/Table/TableHeader";
import TableLayout from "@/app/_components/dashboard/Table/TableLayout";
import Image from "next/image";
import OptionsBtn from "@/app/_components/dashboard/Table/OptionsBtn";
import { deleteCategoryAction } from "@/lib/categoriesActions";
import { IProducts } from "@/models/database/Products";
import { BiSolidAddToQueue } from "react-icons/bi";

type Product = IProducts & { _id: string };

export default async function page() {
  const schema = [
    {
      id: "title",
    },
    {
      id: "images",
      getData(data) {
        return (data as string[]).map((img) => (
          <div key={img} className="flex items-center justify-center p-3">
            <Image src={img} alt="image" width={100} height={100} />
          </div>
        ));
      },
    },
    {
      id: "category",
    },
    {
      id: "descriptions",
    },
    {
      id: "price",
    },
    {
      id: "discount",
    },
    {
      id: "stock",
    },

    {
      id: "_id",
      label: "options",
      getData(data) {
        return (
          <OptionsBtn
            id={data as string}
            basePath="dashboard/products"
            deleteAction={deleteCategoryAction}
          />
        );
      },
    },
  ] satisfies TableSchema<Product>[];

  return (
    <TableLayout
      tableName="products"
      addBtn={{
        Icon: <BiSolidAddToQueue />,
        label: "add category",
        href: "/dashboard/categories/add",
      }}
    >
      <TableHeader<Product> schema={schema} />
      {/* <TableBody<Product>
        schema={schema}
        data={async()=>undefined}
        keyIndex={"_id"}
      /> */}
    </TableLayout>
  );
}
