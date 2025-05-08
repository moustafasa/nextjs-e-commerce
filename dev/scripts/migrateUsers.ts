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
      email: "admin@admin.com",
      roles: [Role.ADMIN],
      password: await hashPassword("123456"),
      image: "https://placehold.co/100x100.webp?text=admin",
    },
    {
      fullName: "Writer user",
      email: "writer@writer.com",
      roles: [Role.WRITER],
      password: await hashPassword("123456"),
      image: "https://placehold.co/100x100.webp?text=writer",
    },
    {
      fullName: "moustafa saad",
      email: "moustafasaad954@gmail.com",
      roles: [Role.ADMIN, Role.USER],
      image:
        "https://dssgraxhulubwyc1.public.blob.vercel-storage.com/profiles/moustafasaad954@gmail.com.-Swc2PPivF3ttJ2SB7ofYaQUSyD2pmj.jpg",
    },
    {
      fullName: "moustafa saad",
      email: "moustafasaad954",
      roles: [Role.USER, Role.ADMIN],
      password: await hashPassword("123456"),
      image:
        "https://dssgraxhulubwyc1.public.blob.vercel-storage.com/profiles/moustafasaad954.-jdQO5V1Kt9YqEDxJ5YUYiDOtsX5kyM.jpg",
    },
  ];

  const dynamicUsers = await Promise.all(
    Array.from({ length: 50 }, async (_, ind) => ({
      fullName: `user num${ind + 1}`,
      email: `user${ind + 1}@user.com`,
      roles: [Role.USER],
      password: await hashPassword("123456"),
      image: `https://placehold.co/100x100.webp?text=user+num${ind + 1}`,
    }))
  );

  await Users.insertMany([...staticUsers, ...dynamicUsers]);
}
