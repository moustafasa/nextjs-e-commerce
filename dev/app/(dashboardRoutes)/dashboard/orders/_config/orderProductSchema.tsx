import formatPrice from "@/app/_utilities/formatPrice";
import { IOrdersProducts } from "@/models/database/Orders";
import { IProducts } from "@/models/database/Products";

type orderTableSchema = Omit<IOrdersProducts, "product"> & {
  product: IProducts;
};
export const schema = [
  {
    id: "product",
    label: "title",
    getData(data) {
      return (data as IProducts).title;
    },
  },
  {
    id: "product",
    label: "price",
    getData(data) {
      return formatPrice((data as IProducts).price);
    },
  },
  { id: "qty" },
  {
    id: "product",
    label: "total Price",
    getData(data, row) {
      const totalPrice =
        ((data as IProducts).price - ((data as IProducts).discount || 0)) *
        row.qty;
      return formatPrice(totalPrice);
    },
  },
] satisfies TableSchema<orderTableSchema>[];
