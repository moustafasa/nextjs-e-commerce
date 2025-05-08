import dbConnect from "@/config/dbConnect";
import Categories from "@/models/database/Categories";
import Products from "@/models/database/Products";

export async function migrateProducts() {
  console.log("Connecting to DB...");
  await dbConnect();
  console.log("Connected to DB successfully");
  console.log("deleting products...");
  await Products.deleteMany({});
  console.log("Products deleted successfully");
  console.log("adding products...");
  const categories = await Categories.find({});

  await Products.insertMany(
    categories
      .map((cat, id) =>
        Array(2)
          .fill(0)
          .map((_, ind) => ({
            title: `product_${ind + 1 + id * 2}`,
            images: [
              `https://placehold.co/200x200.webp?text=product+img1`,
              `https://placehold.co/200x200.webp?text=product+img2`,
              `https://placehold.co/200x200.webp?text=product+img3`,
            ],
            category: cat._id.toString(),
            price: 100,
            stock: 10,
            descriptions: `This is product ${ind + 1 + id * 2}`,
            discount: 30,
          }))
      )
      .flat()
  );
  console.log("Products added successfully");
}
