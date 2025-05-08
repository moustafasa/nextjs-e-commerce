import Skeleton from "@/app/_components/skeletons/Skeleton";
import OptionsBtn from "@/app/_components/Table/OptionsBtn";
import { deleteProductAction } from "@/lib/productsActions";
import { IProducts } from "@/models/database/Products";
import Image from "next/image";

export type Product = IProducts;
export const schema = [
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
    skeletonData: (zepraBg) => (
      <div className="flex  gap-3 p-4 items-center justify-center ">
        {Array(3)
          .fill(0)
          .map((_, ind) => (
            <div
              key={ind}
              className="flex items-center justify-center  min-w-20"
            >
              <Skeleton
                classNames={`w-[100px] h-[100px] rounded-lg ${
                  zepraBg && "dark:group-even:bg-black-bg"
                }`}
              />
            </div>
          ))}
      </div>
    ),
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
