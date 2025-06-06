import Skeleton from "@/app/_components/skeletons/Skeleton";
import formatPrice from "@/app/_utilities/formatPrice";
import { CartSchema, IProductsWithCategory } from "../_types/types";
import ChangeProductQty from "../_components/ChangeProductQty";
import CartProductShow from "../_components/CartProductShow";
import CartProductShowSk from "../_components/CartProductShowSk";
import { FaX } from "react-icons/fa6";
import { deleteProductFromCartAction } from "@/lib/CartActions";

const schema = [
  {
    id: "product",
    getData(data) {
      return <CartProductShow data={data as IProductsWithCategory} />;
    },
    skeletonData: () => <CartProductShowSk />,
  },

  {
    id: "qty",
    getData(data, row) {
      return (
        <ChangeProductQty
          qty={data as number}
          stockNumber={row.product.stock || 0}
          productId={row.product._id.toString()}
        />
      );
    },
    skeletonData() {
      return <Skeleton classNames="sk-button !w-28" />;
    },
  },
  {
    id: "product",
    label: "total price",
    getData(data, row) {
      return (
        <span className="text-xl font-bold px-3">
          {formatPrice(
            ((data as IProductsWithCategory).price -
              ((data as IProductsWithCategory).discount || 0)) *
              row.qty
          )}
        </span>
      );
    },
  },
  {
    id: "product",
    label: "options",
    getData(data) {
      return (
        <form
          action={deleteProductFromCartAction.bind(
            undefined,
            (data as IProductsWithCategory)._id.toString()
          )}
        >
          <button
            className="bg-red-error p-1 rounded-full text-white"
            title="remove product"
          >
            <FaX />
          </button>
        </form>
      );
    },
  },
] satisfies TableSchema<CartSchema>[];

export default schema;
