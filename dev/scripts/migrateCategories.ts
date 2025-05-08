import Categories from "@/models/database/Categories";
import mongoose from "mongoose";

export async function migrateCategories() {
  try {
    await mongoose.connect(process.env.DB_URI);
    await Categories.deleteMany({});
    await Categories.insertMany(
      Array(50)
        .fill(0)
        .map((_, ind) => ({
          title: `category_${ind + 1}`,
          image: `https://placehold.co/100x100.webp?text=category+num${
            ind + 1
          }`,
        }))
    );
    console.log("Categories migrated successfully");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
}
