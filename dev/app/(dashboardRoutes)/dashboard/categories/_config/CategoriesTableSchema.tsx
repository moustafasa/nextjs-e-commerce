import Skeleton from "@/app/_components/skeletons/Skeleton";
import OptionsBtn from "@/app/_components/Table/OptionsBtn";
import { deleteCategoryAction } from "@/lib/categoriesActions";
import { ICategories } from "@/models/database/Categories";
import Image from "next/image";

export type Category = ICategories & { _id: string };
export const schema = [
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
    skeletonData: (zepraBg) => (
      <div className="flex items-center justify-center p-3">
        <Skeleton
          classNames={`w-[100px] h-[100px] rounded-lg ${
            zepraBg && "dark:group-even:bg-black-bg"
          }`}
        />
      </div>
    ),
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
