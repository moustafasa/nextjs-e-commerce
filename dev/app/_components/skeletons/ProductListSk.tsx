import { PRODUCTS_LIMIT } from "@/config/constants";
import Skeleton from "./Skeleton";

export default function ProductListSk() {
  return Array(PRODUCTS_LIMIT)
    .fill(0)
    .map((_, id) => (
      <div
        key={id}
        className="flex flex-col items-center p-4 gap-3 border-gray-input border-[1px] rounded-lg  "
      >
        <div className="">
          <Skeleton classNames="sk-image" />
        </div>
        <h2 className="text-xl ">
          <Skeleton classNames="sk-text w-20" />
        </h2>
      </div>
    ));
}
