import { IProducts } from "@/models/database/Products";

export type IProductsWithCategory = IProducts & { category: { title: string } };
