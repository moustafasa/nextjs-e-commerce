import { model, models, Schema, Types } from "mongoose";
import Products from "./Products";

export interface ICartProducts {
  _id: Types.ObjectId | string;
  product: Types.ObjectId | string;
  qty: number;
}
export interface ICarts {
  _id: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  products: ICartProducts[];
}

const cartSchema = new Schema<ICarts>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    new Schema({
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      qty: { type: Number, default: 1 },
    }),
  ],
});

// eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
Products;
export default models.Cart || model<ICarts>("Cart", cartSchema);
