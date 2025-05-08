import { migrateProducts } from "@/scripts/migrateProducts";

export const GET = async () => {
  try {
    await migrateProducts();
    return new Response("Categories migrated successfully", { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to migrate categories", { status: 500 });
  }
};
