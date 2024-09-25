import { model, models, Schema, Types } from "mongoose";

export interface ICategories {
  _id: Types.ObjectId;
  title: string;
  image: string;
}

const schema = new Schema<ICategories>({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

export default models.Categorie || model<ICategories>("Categorie", schema);
