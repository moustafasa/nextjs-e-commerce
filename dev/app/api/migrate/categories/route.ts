import { migrateCategories } from "@/scripts/migrateCategories";

export const GET = async () => {
  try {
    await migrateCategories();
    return new Response("Categories migrated successfully", { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return new Response("Failed to migrate categories", { status: 500 });
  }
};
