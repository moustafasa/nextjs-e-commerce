import { model, models, Schema, Types } from "mongoose";
import Categories from "./Categories";

export interface IProducts {
  _id: Types.ObjectId | string;
  title: string;
  category:
    | Types.ObjectId
    | string
    | { title: string; _id: Types.ObjectId | string };
  images: string[];
  descriptions: string;
  price: number;
  discount?: number;
  stock?: number;
}

const productSchema = new Schema<IProducts>({
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, required: true, ref: "Categorie" },
  images: { type: [String], required: true },
  descriptions: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
});

// eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
Categories;

export default models?.Product || model<IProducts>("Product", productSchema);
