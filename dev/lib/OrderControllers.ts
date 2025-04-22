import { OrderStatus } from "@/config/constants";
import Orders, { IOrders, IOrdersProducts } from "@/models/database/Orders";
import { IProducts } from "@/models/database/Products";
import { HydratedDocument } from "mongoose";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getPopulatedOrders = cache(async () => {
  const order = await Orders.find({})
    .populate<
      HydratedDocument<
        Omit<IOrders, "products"> & {
          products: (Omit<IOrdersProducts, "product"> & {
            product: HydratedDocument<IProducts>;
          })[];
        }
      >
    >(["products.product", { path: "userId", select: "fullName -_id" }])
    .exec();
  return order;
});
export const getPopulatedOrderById = cache(async (id: string) => {
  const order = await Orders.findOne<HydratedDocument<IOrders>>({ _id: id })
    .populate<{
      userId: { fullName: string };
      products: (Omit<IOrdersProducts, "product"> & {
        product: HydratedDocument<IProducts>;
      })[];
    }>(["products.product", { path: "userId", select: "fullName -_id" }])
    .lean<
      {
        userId: { fullName: string };
        products: (Omit<IOrdersProducts, "product"> & {
          product: HydratedDocument<IProducts>;
        })[];
      } & Omit<IOrders, "userId" | "products">
    >()
    .exec();
  if (!order) {
    return notFound();
  }
  return order;
});

export const getOrderProducts = cache(async (id: string) => {
  const order = await getPopulatedOrderById(id);
  return order.products;
});

export const changeOrderStatus = cache(
  async (id: string, status: OrderStatus) => {
    const order = await Orders.findOne<HydratedDocument<IOrders>>({ _id: id });
    if (!order) return notFound();
    order.status = status;
    await order.save();
    return order.status;
  }
);
