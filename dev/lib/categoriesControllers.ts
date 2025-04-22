import dbConnect from "@/config/dbConnect";
import Categories, { ICategories } from "@/models/database/Categories";
import { AddCategorySchemaType } from "@/models/zodSchemas/Category/addCategorySchema";
import { CategoryExistingError } from "./customErrors";
import { del, put } from "@vercel/blob";
import path from "path";
import { cache } from "react";
import { HydratedDocument, isValidObjectId } from "mongoose";
import checkAuth from "@/app/_utilities/checkAuth";
import { notFound } from "next/navigation";
import { EditCategorySchemaType } from "@/models/zodSchemas/Category/editCategorySchema";
import { Role } from "@/config/constants";

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

export const getCategories = cache(async () => {
  await checkAuth(Role.ADMIN);
  await dbConnect();
  const categories = await Categories.find({}).lean<ICategories[]>().exec();
  return categories.map((cat) => ({ ...cat, _id: cat._id.toString() }));
});

export const getCategoriesForOptions = cache(async () => {
  const cats = await getCategories();
  return cats.map((cat) => ({ label: cat.title, value: cat._id.toString() }));
});

export const getCategoryById = cache(async (id: string) => {
  await checkAuth(Role.ADMIN);
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
    await del(category.image);
    const { url: image } = await put(
      `categories/${result.image.name}${path.extname(result.image.name)}`,
      result.image,
      { access: "public" }
    );
    category.image = image;
  }

  await category.save();
};

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
    await del(category.image);
    await category.deleteOne().exec();
  }
};
