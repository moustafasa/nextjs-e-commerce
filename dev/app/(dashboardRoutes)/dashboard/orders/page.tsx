import TableBody from "@/app/_components/dashboard/Table/TableBody";
import TableHeader from "@/app/_components/dashboard/Table/TableHeader";
import TableLayout from "@/app/_components/dashboard/Table/TableLayout";
import formatPrice from "@/app/_utilities/formatPrice";
import { getPopulatedOrders } from "@/lib/OrderControllers";
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

export default async function page() {
  const schema = [
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
            prev +
            (curr.product.price - (curr.product.discount || 0)) * curr.qty,
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
    },
  ] satisfies TableSchema<IOrdersSchema>[];
  return (
    <TableLayout tableName="orders">
      <TableHeader schema={schema} />
      <TableBody schema={schema} data={getPopulatedOrders()} keyIndex={"_id"} />
    </TableLayout>
  );
}
