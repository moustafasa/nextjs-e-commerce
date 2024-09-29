import { Suspense } from "react";
import LoginOrProfile from "./LoginOrProfile";
import Skeleton from "../skeletons/Skeleton";
import NavClient from "./NavClient";

export default function Nav() {
  return (
    <header className="flex items-center bg-black-nav text-white capitalize pe-4 pt-2 shadow-sm flex-wrap pb-2 lg:pb-2 gap-x-3">
      <NavClient />
      <Suspense
        fallback={
          <Skeleton className={"h-[50px] w-[50px] rounded-full px-2 py-1"} />
        }
      >
        <LoginOrProfile />
      </Suspense>
    </header>
  );
}
