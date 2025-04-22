import { auth } from "@/auth";
import { type Role } from "@/config/constants";
import { redirect } from "next/navigation";

export default async function checkAuth(role: Role) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/sign-in");
  }
  if (!session.user.roles.includes(role)) {
    return redirect("/unauthorized");
  }
}
