import { migrateUsers } from "@/scripts/migrateUsers";

export const GET = async () => {
  try {
    await migrateUsers();
    return new Response("Users migrated successfully", { status: 200 });
  } catch (err) {
    return new Response("Failed to migrate users", { status: 500 });
  }
};
