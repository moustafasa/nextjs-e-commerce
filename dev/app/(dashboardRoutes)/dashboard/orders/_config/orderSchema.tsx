import Skeleton from "@/app/_components/skeletons/Skeleton";
import formatPrice from "@/app/_utilities/formatPrice";
import { IOrders, IOrdersProducts } from "@/models/database/Orders";
import { IProducts } from "@/models/database/Products";
import Link from "next/link";
import { FaEye } from "react-icons/fa";

type IOrdersProductsWithIProducts = Omit<IOrdersProducts, "product"> & {
  product: IProducts;
};
type IOrdersSchema = Omit<IOrders, "userId" | "products"> & {
  userId: { fullName: string };
  products: IOrdersProductsWithIProducts[];
};
export const schema = [
  {
    label: "user name",
    id: "userId",
    getData(data) {
      return (data as { fullName: string }).fullName;
    },
  },

  {
    id: "createdAt",
    getData(data) {
      const date = Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(data as Date);
      return <div>{date}</div>;
    },
  },
  {
    id: "products",
    label: "total price",
    getData(data) {
      const totalPrice = (data as IOrdersProductsWithIProducts[]).reduce(
        (prev, curr) =>
          prev + (curr.product.price - (curr.product.discount || 0)) * curr.qty,
        0
      );
      return <div>{formatPrice(totalPrice)}</div>;
    },
  },
  {
    id: "status",
  },
  {
    id: "_id",
    label: "options",
    getData(data) {
      return (
        <div className="p-4 flex justify-center items-center">
          <Link
            className="hover:text-gray-input text-xl transition-colors duration-300"
            href={`/dashboard/orders/${data.toString()}`}
          >
            <FaEye />
          </Link>
        </div>
      );
    },
    skeletonData(zepraBg) {
      return (
        <div className="p-4 flex justify-center items-center">
          <Skeleton
            classNames={`sk-ellipse ${
              zepraBg && "dark:group-even:bg-black-bg"
            }`}
          />
        </div>
      );
    },
  },
] satisfies TableSchema<IOrdersSchema>[];
