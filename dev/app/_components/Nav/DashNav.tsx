import { Suspense } from "react";
import Logo from "../Nav/Logo";
import Skeleton from "../skeletons/Skeleton";
import Profile from "../Nav/Profile";
import DashCollapseButton from "./DashCollapseButton";

export default function DashNav() {
  return (
    <header className="fixed w-full top-0 left-0 flex items-center justify-between bg-black-nav text-white capitalize pe-4 pt-2 shadow-sm  pb-2 lg:pb-2 gap-x-3 h-dashNav-h">
      <div className="flex sm:gap-8 ">
        <Logo />
        <DashCollapseButton />
      </div>
      <h2 className="text-blue-button font-bold text-2xl">dashboard</h2>
      <Suspense
        fallback={
          <Skeleton className={"h-[50px] w-[50px] rounded-full px-2 py-1"} />
        }
      >
        <Profile />
      </Suspense>
    </header>
  );
}
