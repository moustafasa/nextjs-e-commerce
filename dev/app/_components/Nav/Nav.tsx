import { Suspense } from "react";
import LoginOrProfile from "./LoginOrProfile";
import Skeleton from "../skeletons/Skeleton";
import NavClient from "./NavClient";

export default function Nav() {
  return (
    <header className=" fixed top-0 w-full flex items-center dark:bg-black-nav bg-white dark:text-white  capitalize  pt-2 shadow-sm flex-wrap pb-2 lg:pb-2 gap-x-3 h-nav-h z-20">
      <NavClient />
      <Suspense
        fallback={
          <Skeleton classNames={"h-[50px] w-[50px] rounded-full px-2 py-1"} />
        }
      >
        <LoginOrProfile />
      </Suspense>
    </header>
  );
}
