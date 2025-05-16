import dbConnect from "@/config/dbConnect";
import { AddProductSchemaType } from "@/models/zodSchemas/Product/addProductsSchema";
import { copy, del } from "@vercel/blob";
import Products, { IProducts } from "@/models/database/Products";
import { FilterQuery, HydratedDocument, isValidObjectId } from "mongoose";
import path from "path";
import { cache } from "react";
import checkAuth from "@/app/_utilities/checkAuth";
import { notFound } from "next/navigation";
import {
  ProductExistingError,
  ProductImagesBelowLimitError,
} from "./customErrors";
import { EditProductSchemaType } from "@/models/zodSchemas/Product/editProductsSchema";
import { AddToStockSchema } from "@/models/zodSchemas/Product/addToStockSchema";
import { PRODUCTS_LIMIT, Role } from "@/config/constants";
import { getSearchRgx } from "./utils";

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

export const getProducts = cache(async (page?: number, search?: string) => {
  await checkAuth(Role.ADMIN);
  await dbConnect();

  const query = Products.find({});

  if (page) {
    query.skip(PRODUCTS_LIMIT * (page - 1)).limit(PRODUCTS_LIMIT);
  }

  if (search) {
    const regex = getSearchRgx(search);
    query.where({ title: regex, descriptions: regex });
  }

  const products = await query
    .populate("category", "title")
    .lean<IProducts[]>()
    .exec();
  return products.map((prod) => ({ ...prod, _id: prod._id.toString() }));
});

export const getProductsWithCategory = cache(
  async (category?: string | string[], page: number = 1, search?: string) => {
    await checkAuth(Role.ADMIN);
    await dbConnect();
    const filter: FilterQuery<IProducts> = category ? { category } : {};
    if (search) {
      const regex = getSearchRgx(search);
      filter.$or = [{ title: regex }, { descriptions: regex }];
    }
    const products = await Products.find(filter)
      .skip(PRODUCTS_LIMIT * (page - 1))
      .limit(PRODUCTS_LIMIT)
      .lean<IProducts[]>()
      .exec();
    return products;
  }
);

export const getProductsWithCategoryTotal = cache(
  async (category?: string | string[], search?: string) => {
    await checkAuth(Role.ADMIN);
    await dbConnect();
    const filter: FilterQuery<IProducts> = category ? { category } : {};
    if (search) {
      const esc = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(esc, "i");
      filter.$or = [{ title: regex }, { descriptions: regex }];
    }
    const totalProducts = await Products.countDocuments(filter).exec();
    return {
      totalProducts,
      totalPages: Math.ceil(totalProducts / PRODUCTS_LIMIT),
      limit: PRODUCTS_LIMIT,
    };
  }
);

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
export const getProductByIdWithPopulation = cache(async (id: string) => {
  await checkAuth(Role.ADMIN);
  if (!isValidObjectId(id)) {
    return null;
  }

  await dbConnect();

  const product = await Products.findById<HydratedDocument<IProducts>>(id)
    .populate<IProducts & { category: { id: string; title: string } }>(
      "category",
      "title"
    )
    .exec();

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

export const getProductsIds = async () => {
  await dbConnect();
  const productsId = await Products.find({}).select("_id").exec();
  return productsId;
};
