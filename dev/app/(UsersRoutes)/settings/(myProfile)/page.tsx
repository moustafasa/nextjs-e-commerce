import MyProfileForm from "@/app/(UsersRoutes)/settings/_components/MyProfileForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/sign-in");
  }
  return (
    <MyProfileForm
      img={session.user.image}
      fullName={session.user.fullName}
      email={session.user.email}
      provider={session.provider}
    />
  );
}
