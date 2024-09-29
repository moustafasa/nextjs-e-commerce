import { auth } from "@/auth";
import { roles } from "@/auth.config";
import { redirect } from "next/navigation";

export async function getUsers() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/login");
  }
  if (!session.user.roles.includes(roles.ADMIN)) {
    return redirect("/unauthorized");
  }
}
