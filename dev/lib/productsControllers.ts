import dbConnect from "@/config/dbConnect";
import { AddProductSchemaType } from "@/models/zodSchemas/Product/addProductsSchema";
import { copy, del } from "@vercel/blob";
import Products, { IProducts } from "@/models/database/Products";
import { HydratedDocument } from "mongoose";
import path from "path";

export const addProduct = async (product: AddProductSchemaType) => {
  await dbConnect();
  const newProduct: HydratedDocument<IProducts> = await Products.create({
    title: product.title,
    category: product.category,
    descriptions: product.descriptions,
    price: product.price,
    discount: product.discount,
  });
  const images = product.images.map(async (img) => {
    const newImg = await copy(
      img,
      `/products/${newProduct.id}/${path.basename(img)}`,
      {
        access: "public",
      }
    );
    return newImg.url;
  });
  newProduct.images = await Promise.all(images);
  await newProduct.save();
  await del(product.images);
};

// export const getCategories = cache(async () => {
//   await checkAuth(Role.ADMIN);
//   await dbConnect();
//   const categories = await Categories.find({}).lean<ICategories[]>().exec();
//   return categories.map((cat) => ({ ...cat, _id: cat._id.toString() }));
// });

// export const getCategoryById = cache(async (id: string) => {
//   await checkAuth(Role.ADMIN);
//   if (!isValidObjectId(id)) {
//     return null;
//   }

//   await dbConnect();
//   const category = await Categories.findById<HydratedDocument<ICategories>>(
//     id
//   ).exec();

//   return category;
// });

// export const editCategory = async (
//   id: string,
//   result: EditCategorySchemaType
// ) => {
//   const category = await getCategoryById(id);

//   if (!category) {
//     notFound();
//   }

//   if (category.title !== result.title) {
//     const foundCategory = await Categories.findOne({ title: result.title });
//     if (foundCategory) {
//       throw new CategoryExistingError();
//     }
//     category.title = result.title;
//   }

//   if (result.image.size > 0) {
//     await del(category.image);
//     const { url: image } = await put(
//       `categories/${result.image.name}${path.extname(result.image.name)}`,
//       result.image,
//       { access: "public" }
//     );
//     category.image = image;
//   }

//   await category.save();
// };

// export const deleteCategory = async (_id: string) => {
//   await dbConnect();
//   const category = await Categories.findById<HydratedDocument<ICategories>>(
//     _id
//   ).exec();
//   if (!category) notFound();
//   if (
//     category.image.search("dssgraxhulubwyc1.public.blob.vercel-storage.com") >=
//     0
//   ) {
//     await del(category.image);
//     await category.deleteOne().exec();
//   }
// };
