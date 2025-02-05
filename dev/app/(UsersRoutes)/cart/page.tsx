import ChangeProductQty from "@/app/_components/cart/ChangeProductQty";
import CheckoutForm from "@/app/_components/cart/checkoutForm";
import CartTotal from "@/app/_components/CartTotal";
import TableBody from "@/app/_components/dashboard/Table/TableBody";
import TableHeader from "@/app/_components/dashboard/Table/TableHeader";
import TableLayout from "@/app/_components/dashboard/Table/TableLayout";
import PriceWithDiscount from "@/app/_components/shop-now/PriceWithDiscount";
import ProductRippon from "@/app/_components/shop-now/ProductRippon";
import formatPrice from "@/app/_utilities/formatPrice";
import { getCartProducts } from "@/lib/CartControllers";
import { IProducts } from "@/models/database/Products";
import Image from "next/image";

type IProductsWithCategory = IProducts & { category: { title: string } };
type CartSchema = {
  _id: string;
  qty: number;
  product: IProductsWithCategory;
};
export default async function page() {
  const schema = [
    {
      id: "product",

      getData(data) {
        return (
          <div className="flex gap-3 py-4 ps-5 w-max">
            <div className="relative bg-black-tertiery-bg p-3 rounded-lg shadow-lg flex-shrink-0">
              <ProductRippon discountPercent={50} />
              <Image
                className="w-[150px] h-[150px] block flex-shrink-0 object-cover"
                src={(data as IProductsWithCategory).images[0]}
                alt="product image"
                width={150}
                height={150}
              />
            </div>
            <div className="flex flex-col items-start  gap-5 flex-shrink-0">
              <div className="flex flex-col items-start flex-shrink-0">
                <span>{(data as IProductsWithCategory).category.title}</span>
                <h2 className=" capitalize text-xl font-bold">
                  {(data as IProductsWithCategory).title}
                </h2>
              </div>
              <PriceWithDiscount
                price={(data as IProductsWithCategory).price}
                discount={(data as IProductsWithCategory).discount}
              />
            </div>
          </div>
        );
      },
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
    },
    {
      id: "product",
      label: "total price",
      getData(data, row) {
        return (
          <span className="text-xl font-bold">
            {formatPrice((data as IProductsWithCategory).price * row.qty)}
          </span>
        );
      },
    },
  ] satisfies TableSchema<CartSchema>[];

  return (
    <>
      <TableLayout tableName="your shoping cart" className="table-fixed">
        <TableHeader<CartSchema> noId schema={schema} />
        <TableBody<CartSchema>
          schema={schema}
          data={getCartProducts()}
          keyIndex="_id"
          zepraBg={false}
          noId
        />
      </TableLayout>
      <CartTotal />
      <CheckoutForm />
    </>
  );
}
