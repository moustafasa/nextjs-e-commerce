import dbConnect from "@/config/dbConnect";
import Categories, { ICategories } from "@/models/database/Categories";
import { AddCategorySchemaType } from "@/models/zodSchemas/Category/addCategorySchema";
import { CategoryExistingError } from "./customErrors";
import { del, put } from "@vercel/blob";
import path from "path";
import { cache } from "react";
import { FilterQuery, HydratedDocument, isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";
import { EditCategorySchemaType } from "@/models/zodSchemas/Category/editCategorySchema";
import { CATEGORIES_LIMIT } from "@/config/constants";
import { getSearchRgx } from "./getSearchRgx";

export const addCategory = async (category: AddCategorySchemaType) => {
  await dbConnect();
  const foundCategory = await Categories.findOne({ title: category.title });
  if (foundCategory) {
    throw new CategoryExistingError();
  }

  const { url: image } = await put(
    `categories/${category.title}${path.extname(category.image.name)}`,
    category.image,
    { access: "public" }
  );

  await Categories.create({ image, title: category.title });
};

export const getCategories = cache(async (page?: number, search?: string) => {
  await dbConnect();
  const query = Categories.find({});
  if (page) {
    query.skip(CATEGORIES_LIMIT * (page - 1)).limit(CATEGORIES_LIMIT);
  }
  if (search) {
    const regex = getSearchRgx(search);
    query.where({ title: regex });
  }
  const categories = await query.lean<ICategories[]>().exec();
  return categories.map((cat) => ({ ...cat, _id: cat._id.toString() }));
});

export const getCategoriesForOptions = cache(async () => {
  const cats = await getCategories();
  return cats.map((cat) => ({ label: cat.title, value: cat._id.toString() }));
});

export const getCategoryById = cache(async (id: string) => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await dbConnect();
  const category = await Categories.findById<HydratedDocument<ICategories>>(
    id
  ).exec();

  return category;
});

export const editCategory = async (
  id: string,
  result: EditCategorySchemaType
) => {
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  if (category.title !== result.title) {
    const foundCategory = await Categories.findOne({ title: result.title });
    if (foundCategory) {
      throw new CategoryExistingError();
    }
    category.title = result.title;
  }

  if (result.image.size > 0) {
    try {
      await del(category.image);
    } catch (err) {
      console.log(err);
    }
    const { url: image } = await put(
      `categories/${result.image.name}${path.extname(result.image.name)}`,
      result.image,
      { access: "public" }
    );
    category.image = image;
  }

  await category.save();
};

export const getCategoriesMetaData = cache(async (search?: string) => {
  await dbConnect();
  const filter: FilterQuery<ICategories> = {};
  if (search) {
    const regex = getSearchRgx(search);
    filter.$or = [{ title: regex }];
  }
  const totalItems = await Categories.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / CATEGORIES_LIMIT);
  return { totalPages, totalItems };
});

export const deleteCategory = async (_id: string) => {
  await dbConnect();
  const category = await Categories.findById<HydratedDocument<ICategories>>(
    _id
  ).exec();
  if (!category) notFound();
  if (
    category.image.search("dssgraxhulubwyc1.public.blob.vercel-storage.com") >=
    0
  ) {
    try {
      await del(category.image);
    } catch (err) {
      console.log(err);
    }
    await category.deleteOne().exec();
  }
};

export const getCategoriesIds = async () => {
  await dbConnect();
  const categoriesIds = await Categories.find({}).select("_id").exec();
  return categoriesIds;
};
