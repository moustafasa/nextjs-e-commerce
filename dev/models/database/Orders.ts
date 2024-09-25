import { model, models, Schema, Types } from "mongoose";

export const orderStatus = {
  IDLE: "idle",
  SHIPPED: "shipped",
  ARIVED: "arrived",
} as const;

export type OrderStatus = (typeof orderStatus)[keyof typeof orderStatus];

export interface IOrders {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  products: [
    {
      _id: Types.ObjectId;
      product: Types.ObjectId;
      qty: number;
    }
  ];
  status: OrderStatus;
  createdAt: string;
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

export default models.Order || model<IOrders>("Order", ordersSchema);
