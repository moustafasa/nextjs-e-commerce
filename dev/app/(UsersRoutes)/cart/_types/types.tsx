import { IProducts } from "@/models/database/Products";

export type IProductsWithCategory = IProducts & { category: { title: string } };
export type CartSchema = {
  _id: string;
  qty: number;
  product: IProductsWithCategory;
};
