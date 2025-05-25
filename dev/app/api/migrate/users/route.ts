import { migrateUsers } from "@/scripts/migrateUsers";

export const GET = async () => {
  try {
    await migrateUsers();
    return new Response("Users migrated successfully", { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.log(err);
    return new Response("Failed to migrate users", { status: 500 });
  }
};
