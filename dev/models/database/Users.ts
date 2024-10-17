import { Role } from "@/auth.config";
import mongoose, { Schema, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId | string;
  fullName: string;
  email: string;
  roles: Role[];
  password?: string;
  image?: string;
  orders: string[];
}

const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roles: {
    type: [Number],
    enum: Object.values(Role)
      .filter((role) => !isNaN(+role))
      .map((role) => +role),
    default: [Role.USER],
  },
  password: { type: String },
  image: { type: String },
  orders: { type: [Number], default: [], ref: "Order" },
});

export default mongoose.models?.User ||
  mongoose.model<IUser>("User", UserSchema);
