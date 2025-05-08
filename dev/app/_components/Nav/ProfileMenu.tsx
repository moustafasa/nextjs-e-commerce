import ToggleButton from "./ToggleButton";
import Link from "next/link";
import { IoSettings } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import profile from "@/images/profile.png";
import cn from "@/app/_utilities/cssConditional";
import { signOutAction } from "@/lib/usersActions";
import type { Session } from "next-auth";
import useThemeStorage from "@/app/_utilities/useThemeStorage";

type Props = { isOpen: boolean; data: Session };
export default function ProfileMenu({ isOpen, data }: Props) {
  const [theme, setTheme] = useThemeStorage();

  return (
    <menu
      id="profile"
      className={cn(
        "hidden absolute  w-[calc(100vw-3rem)] bg-gray-400/90 font-bold text-white dark:text-white  dark:bg-menu-transparent-black sm:w-[300px] sm:right-4 rounded-lg z-50 right-0 backdrop-blur-md",
        { block: isOpen }
      )}
    >
      <li className="flex gap-2 items-start p-4 px-4 border-b-[1px]">
        <div className="rounded-full overflow-hidden w-[55px] h-[55px]">
          <Image
            className="max-h-full max-w-full object-cover"
            src={data?.user.image || profile}
            width={data?.user.image ? 55 : undefined}
            height={data?.user.image ? 55 : undefined}
            alt="profile"
          />
        </div>
        <div className="flex flex-col pt-1">
          <span className="block">{data?.user.fullName}</span>
          <span className="text-xs lowercase block ">{data?.user.email}</span>
        </div>
      </li>
      <li className="p-3 border-b-[1px]">
        <button
          className="flex gap-3 items-center capitalize hover:bg-slate-500 hover:text-white dark:hover:bg-menu-transparent-gray h-full w-full text-left p-2 rounded-lg"
          onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
          }}
        >
          <ToggleButton />
          <div>switch to {theme} mode</div>
        </button>
      </li>
      <li className="p-3 border-b-[1px]">
        <Link
          href={"/settings"}
          className="flex gap-3 items-center  capitalize hover:bg-slate-500 hover:text-white dark:hover:bg-menu-transparent-gray h-full w-full text-left p-2 rounded-lg"
        >
          <IoSettings size={30} className="dark:text-gray-icons text-white " />
          <div>settings</div>
        </Link>
      </li>
      <li className="p-3">
        <form action={signOutAction}>
          <button
            type="submit"
            className="flex gap-3 items-center  capitalize hover:bg-slate-500 hover:text-white dark:hover:bg-menu-transparent-gray h-full w-full text-left p-2 rounded-lg"
            onClick={() => {}}
          >
            <BiLogOut size={30} className="dark:text-gray-icons text-white  " />
            <div>logout</div>
          </button>
        </form>
      </li>
    </menu>
  );
}
