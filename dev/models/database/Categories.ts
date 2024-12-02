import { model, models, Schema, Types } from "mongoose";

export interface ICategories {
  _id: Types.ObjectId | string;
  title: string;
  image: string;
}

const schema = new Schema<ICategories>({
  title: { type: String, required: true, unique: true },
  image: { type: String },
});

export default models?.Categorie || model<ICategories>("Categorie", schema);
