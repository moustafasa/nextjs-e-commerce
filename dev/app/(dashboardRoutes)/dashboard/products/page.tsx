import TableHeader from "@/app/_components/dashboard/Table/TableHeader";
import TableLayout from "@/app/_components/dashboard/Table/TableLayout";
import Image from "next/image";
import OptionsBtn from "@/app/_components/dashboard/Table/OptionsBtn";
import { IProducts } from "@/models/database/Products";
import { BiSolidAddToQueue } from "react-icons/bi";
import TableBody from "@/app/_components/dashboard/Table/TableBody";
import { getProducts } from "@/lib/productsControllers";
import { deleteProductAction } from "@/lib/productsActions";
// import { deleteProductAction } from "@/lib/productsActions";

type Product = IProducts;

export default async function page() {
  const schema = [
    {
      id: "title",
    },
    {
      id: "images",
      getData(data) {
        return (
          <div className="flex  gap-3 p-4 items-center justify-center ">
            {(data as string[]).map((img) => (
              <div
                key={img}
                className="flex items-center justify-center  min-w-20"
              >
                <Image
                  src={img}
                  className="h-20 object-cover"
                  alt="image"
                  width={`${120}`}
                  height={`${120}`}
                />
              </div>
            ))}
          </div>
        );
      },
    },
    {
      id: "category",
      getData(data) {
        return (data as { title: string }).title;
      },
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
            deleteAction={deleteProductAction}
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
        label: "add product",
        href: "/dashboard/products/add",
      }}
    >
      <TableHeader<Product> schema={schema} />
      <TableBody<Product>
        schema={schema}
        data={getProducts()}
        keyIndex={"_id"}
      />
    </TableLayout>
  );
}
