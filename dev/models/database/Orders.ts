import { model, models, Schema, Types } from "mongoose";
import Users from "./Users";
import Products from "./Products";

export const orderStatus = {
  IDLE: "idle",
  SHIPPED: "shipped",
  ARIVED: "arrived",
} as const;

export type OrderStatus = (typeof orderStatus)[keyof typeof orderStatus];

export interface IOrdersProducts {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  qty: number;
}

export interface IOrders {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  products: IOrdersProducts[];
  status: OrderStatus;
  createdAt: Date;
}

const ordersSchema = new Schema<IOrders>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        qty: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: [...new Set(Object.values(orderStatus))],
      default: orderStatus.IDLE,
    },
  },
  { timestamps: true }
);

// eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
Users;
// eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
Products;

export default models.Order || model<IOrders>("Order", ordersSchema);
