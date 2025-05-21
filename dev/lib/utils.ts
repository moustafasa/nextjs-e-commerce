import { auth } from "@/auth";
import { type Role } from "@/config/constants";
import { redirect } from "next/navigation";

export function getSearchRgx(search: string) {
  const esc = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(esc, "i");
  return regex;
}

export default async function checkAuth(role?: Role[]) {
  const session = await auth();
  if (!session?.user) {
    return redirect("/sign-in");
  }
  if (!role) return;
  if (!role.find((role) => !!session.user.roles.includes(role))) {
    return redirect("/unauthorized");
  }
}
