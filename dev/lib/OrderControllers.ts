import Orders, { IOrders, IOrdersProducts } from "@/models/database/Orders";
import { IProducts } from "@/models/database/Products";
import { HydratedDocument } from "mongoose";
import { cache } from "react";

export const getPopulatedOrders = cache(async () => {
  const order = await Orders.find<HydratedDocument<IOrders>>({})
    .populate<{
      products: (Omit<IOrdersProducts, "product"> & {
        product: HydratedDocument<IProducts>;
      })[];
    }>(["products.product", { path: "userId", select: "fullName -_id" }])
    .exec();
  return order;
});
