import mongoose, { Schema, Types } from "mongoose";

export const roles = {
  ADMIN: 1000,
  USER: 2500,
  WRITER: 3000,
  ORDER_REPORTER: 4000,
} as const;

export type Role = (typeof roles)[keyof typeof roles];

export interface IUser {
  _id: Types.ObjectId;
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
    enum: Object.values(roles),
    default: [roles.USER],
  },
  password: { type: String },
  image: { type: String },
  orders: { type: [Number], default: [], ref: "Order" },
});

export default mongoose.models?.User ||
  mongoose.model<IUser>("User", UserSchema);
