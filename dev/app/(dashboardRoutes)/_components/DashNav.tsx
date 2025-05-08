import { Suspense } from "react";
import Logo from "../../_components/Nav/Logo";
import Skeleton from "../../_components/skeletons/Skeleton";
import Profile from "../../_components/Nav/Profile";
import DashCollapseButton from "./DashCollapseButton";
import { auth } from "@/auth";

export default async function DashNav() {
  const user = await auth();
  if (!user) return null;
  return (
    <header className="fixed w-full z-50 top-0 left-0 flex items-center justify-between bg-white dark:bg-black-nav capitalize pe-4 pt-2 shadow-sm  pb-2 lg:pb-2 gap-x-3 h-dashNav-h">
      <div className="flex sm:gap-8 ">
        <Logo />
        <DashCollapseButton />
      </div>
      <h2 className="text-blue-button font-bold text-2xl">dashboard</h2>
      <Suspense
        fallback={
          <Skeleton classNames={"h-[50px] w-[50px] rounded-full px-2 py-1"} />
        }
      >
        <Profile data={user} />
      </Suspense>
    </header>
  );
}
