import { Role } from "@/config/constants";
import { hashPassword } from "@/lib/usersControllers";
import Users from "@/models/database/Users";
import mongoose from "mongoose";

export async function migrateUsers() {
  await mongoose.connect(process.env.DB_URI);
  await Users.deleteMany({});

  // Prepare user documents
  const staticUsers = [
    {
      fullName: "admin user",
      email: "admin",
      roles: [Role.ADMIN],
      password: await hashPassword("123456"),
      image: "https://placehold.co/100x100.webp?text=admin",
    },
    {
      fullName: "Writer user",
      email: "writer",
      roles: [Role.WRITER],
      password: await hashPassword("123456"),
      image: "https://placehold.co/100x100.webp?text=writer",
    },
    {
      fullName: "orderReporter user",
      email: "orderReporter",
      roles: [Role.WRITER],
      password: await hashPassword("123456"),
      image: "https://placehold.co/100x100.webp?text=writer",
    },
  ];

  const dynamicUsers = await Promise.all(
    Array.from({ length: 20 }, async (_, ind) => ({
      fullName: `user num${ind + 1}`,
      email: `user${ind + 1}@user.com`,
      roles: [Role.USER],
      password: await hashPassword("123456"),
      image: `https://placehold.co/100x100.webp?text=user+num${ind + 1}`,
    }))
  );

  await Users.insertMany([...staticUsers, ...dynamicUsers]);
}
