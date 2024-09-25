import { model, models, Schema, Types } from "mongoose";

export interface IProducts {
  _id: Types.ObjectId;
  title: string;
  category: Types.ObjectId;
  images: string[];
  descriptions: string;
  price: number;
  discount?: number;
  stock?: number;
}

const productSchema = new Schema<IProducts>({
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Catogrie" },
  images: { type: [String], required: true },
  descriptions: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
});

export default models.Product || model<IProducts>("Product", productSchema);
