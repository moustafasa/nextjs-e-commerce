import { Suspense } from "react";
import LoginOrProfile from "./LoginOrProfile";
import NavClient from "./NavClient";
import ProfileSk from "./ProfileSk";

export default function Nav() {
  return (
    <header className=" fixed top-0 w-full flex items-center  dark:bg-black-nav bg-white dark:text-white  capitalize  pt-2 shadow-sm flex-wrap pb-2 lg:pb-2 gap-x-3 h-nav-h z-20">
      <NavClient />
      <div className="ms-auto lg:ms-0 flex items-center gap-3 pe-4">
        <Suspense fallback={<ProfileSk />}>
          <LoginOrProfile />
        </Suspense>
      </div>
    </header>
  );
}
