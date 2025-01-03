import dbConnect from "@/config/dbConnect";
import { AddProductSchemaType } from "@/models/zodSchemas/Product/addProductsSchema";
import { copy, del } from "@vercel/blob";
import Products, { IProducts } from "@/models/database/Products";
import { HydratedDocument, isValidObjectId } from "mongoose";
import path from "path";
import { cache } from "react";
import checkAuth from "@/app/_utilities/checkAuth";
import { Role } from "@/auth.config";
import { notFound } from "next/navigation";
import {
  ProductExistingError,
  ProductImagesBelowLimitError,
} from "./customErrors";
import { EditProductSchemaType } from "@/models/zodSchemas/Product/editProductsSchema";
import { AddToStockSchema } from "@/models/zodSchemas/Product/addToStockSchema";

export const saveDraftedImages = async (id: string, images: string[]) => {
  const savedImagesPromises = images.map(async (img) => {
    const newImg = await copy(img, `/products/${id}/${path.basename(img)}`, {
      access: "public",
      cacheControlMaxAge: 5000,
    });
    return newImg.url;
  });
  const savedImages = await Promise.all(savedImagesPromises);
  await del(images);

  return savedImages;
};

export const addProduct = async (result: AddProductSchemaType) => {
  await dbConnect();
  const { images, ...product } = result;
  const foundProduct = await Products.findOne({
    title: product.title,
    category: product.category,
  });

  if (foundProduct) {
    throw new ProductExistingError();
  }

  const newProduct: HydratedDocument<IProducts> = await Products.create(
    product
  );

  newProduct.images = await saveDraftedImages(newProduct.id, images);

  await newProduct.save();
};

export const getProducts = cache(async () => {
  await checkAuth(Role.ADMIN);
  await dbConnect();
  const products = await Products.find({})
    .populate("category", "title")
    .lean<IProducts[]>()
    .exec();
  return products.map((prod) => ({ ...prod, _id: prod._id.toString() }));
});

export const getProductsWithCategory = cache(async (category?: string) => {
  await checkAuth(Role.ADMIN);
  await dbConnect();
  const filter = category ? { category } : {};
  const products = await Products.find(filter).lean<IProducts[]>().exec();
  return products;
});

export const getProductsForOptions = cache(async (category?: string) => {
  await checkAuth(Role.ADMIN);
  let products: IProducts[] = [];
  if (category) {
    await dbConnect();
    products = await Products.find({ category }).lean<IProducts[]>().exec();
  } else {
    products = await getProducts();
  }
  return products.map((product) => ({
    label: product.title,
    value: product._id.toString(),
  }));
});

export const getProductById = cache(async (id: string) => {
  await checkAuth(Role.ADMIN);
  if (!isValidObjectId(id)) {
    return null;
  }

  await dbConnect();
  const product = await Products.findById<HydratedDocument<IProducts>>(
    id
  ).exec();

  return product;
});

export const editProduct = async (
  id: string,
  result: EditProductSchemaType
) => {
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  if (
    product.title !== result.title ||
    product.category.toString() !== result.category
  ) {
    const foundProduct = await Products.findOne({
      title: result.title,
      category: result.category,
    });
    if (foundProduct) {
      throw new ProductExistingError();
    }
  }

  if (
    result.images.length + product.images.length - result.deletedImages.length <
    3
  ) {
    throw new ProductImagesBelowLimitError();
  }

  if (result.deletedImages.length > 0) {
    await del(result.deletedImages);
    product.images = product.images.filter(
      (img) => !result.deletedImages.includes(img)
    );
  }

  if (result.images.length > 0) {
    const savedImages = await saveDraftedImages(product.id, result.images);
    product.images.push(...savedImages);
  }

  const propertiesToUpdate = [
    "title",
    "category",
    "descriptions",
    "stock",
    "price",
    "discount",
  ] as const;

  for (const prop of propertiesToUpdate) {
    if (product[prop] !== result[prop]) {
      product[prop] = result[prop] as never;
    }
  }

  await product.save();
};

export const addToStock = async (result: AddToStockSchema) => {
  const product = await getProductById(result.product);
  if (!product) notFound();
  (product.stock as number) += result.stock;
  await product.save();
};

export const deleteProduct = async (id: string) => {
  await dbConnect();
  const product = await getProductById(id);
  if (!product) notFound();
  if (product.images.length > 0) {
    await del(product.images);
  }
  await product.deleteOne().exec();
};

export const deleteProductImage = async (url: string) => {
  await del(url);
};
