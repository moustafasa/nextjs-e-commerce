import { model, models, Schema, Types } from "mongoose";

export interface ICarts {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  products: [
    {
      _id: Types.ObjectId;
      product: Types.ObjectId;
      qty: number;
    }
  ];
}

const cartSchema = new Schema<ICarts>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    new Schema({
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      qty: { type: Number, default: 1 },
    }),
  ],
});

export default models.Cart || model<ICarts>("Cart", cartSchema);
