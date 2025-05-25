import { ORDERS_LIMIT, OrderStatus } from "@/config/constants";
import dbConnect from "@/config/dbConnect";
import Orders, { IOrders, IOrdersProducts } from "@/models/database/Orders";
import { IProducts } from "@/models/database/Products";
import { HydratedDocument } from "mongoose";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getSearchRgx } from "./getSearchRgx";

export const getPopulatedOrders = cache(
  async (page?: number, search?: string) => {
    await dbConnect();
    // First, get the IDs of orders that match the search criteria
    let matchingOrderIds = [];

    if (search) {
      const regex = getSearchRgx(search);
      // Find orders by performing an aggregation
      matchingOrderIds = await Orders.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userInfo",
          },
        },
        {
          $addFields: {
            idString: { $toString: "$_id" },
          },
        },
        {
          $match: {
            $or: [
              { idString: { $regex: regex } },
              { "userInfo.fullName": { $regex: regex } },
            ],
          },
        },
        {
          $project: { _id: 1 },
        },
      ]);
    }

    // Build the main query
    const query = Orders.find(
      search ? { _id: { $in: matchingOrderIds.map((o) => o._id) } } : {}
    )
      .populate([
        "products.product",
        { path: "userId", select: "fullName -_id" },
      ])
      .sort({
        status: -1,
        createdAt: -1,
      });

    if (page) {
      query.skip(ORDERS_LIMIT * (page - 1)).limit(ORDERS_LIMIT);
    }

    const orders = await query
      .lean<
        (Omit<IOrders, "products"> & {
          products: (Omit<IOrdersProducts, "product"> & {
            product: IProducts;
          })[];
        })[]
      >()
      .exec();
    return orders;
  }
);

export const getOrdersMeta = cache(async (search?: string) => {
  await dbConnect();
  let totalItems = 0;

  if (search) {
    const regex = getSearchRgx(search);
    totalItems = await Orders.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $addFields: {
          idString: { $toString: "$_id" },
        },
      },
      {
        $match: {
          $or: [
            { "userInfo.fullName": { $regex: regex } },
            { idString: { $regex: regex } },
          ],
        },
      },
      {
        $count: "total",
      },
    ]).then((result) => result[0]?.total || 0);
  } else {
    totalItems = await Orders.countDocuments();
  }

  const totalPages = Math.ceil(totalItems / ORDERS_LIMIT);
  return { totalPages };
});

export const getPopulatedOrderById = cache(async (id: string) => {
  await dbConnect();
  const order = await Orders.findById<HydratedDocument<IOrders>>(id)
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
    await dbConnect();
    const order = await Orders.findOne<HydratedDocument<IOrders>>({ _id: id });
    if (!order) return notFound();
    order.status = status;
    await order.save();
    return order.status;
  }
);

export const getOrderIds = cache(async () => {
  await dbConnect();
  const orderIds = await Orders.find({}, "_id");
  return orderIds;
});
