import ToggleButton from "./ToggleButton";
import Link from "next/link";
import { IoSettings } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import profile from "@/images/profile.png";
import { useState } from "react";
import cn from "@/app/_utilities/cssConditional";
import { signOutAction } from "@/lib/usersActions";
import { useSession } from "next-auth/react";

type Props = { isOpen: boolean; data: ReturnType<typeof useSession>["data"] };
export default function ProfileMenu({ isOpen, data }: Props) {
  const [dark, setDark] = useState(true);
  // const { data } = useSession();

  return (
    <menu
      id="profile"
      className={cn(
        "hidden absolute bg-menu-transparent-black sm:w-[300px] sm:right-4 rounded-lg z-50 right-0 backdrop-blur-md",
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
          className="flex gap-3 items-center capitalize hover:bg-menu-transparent-gray h-full w-full text-left p-2 rounded-lg"
          onClick={() => {
            setDark((prev) => !prev);
          }}
        >
          <ToggleButton dark={dark} />
          <div>switch to {dark ? "light" : "dark"} mode</div>
        </button>
      </li>
      <li className="p-3 border-b-[1px]">
        <Link
          href={"/settings"}
          className="flex gap-3 items-center capitalize hover:bg-menu-transparent-gray h-full w-full text-left p-2 rounded-lg"
        >
          <IoSettings size={30} className="text-gray-icons" />
          <div>settings</div>
        </Link>
      </li>
      <li className="p-3">
        <form action={signOutAction}>
          <button
            type="submit"
            className="flex gap-3 items-center capitalize hover:bg-menu-transparent-gray h-full w-full text-left p-2 rounded-lg"
            onClick={() => {
              console.log("done");
            }}
          >
            <BiLogOut size={30} className="text-gray-icons" />
            <div>logout</div>
          </button>
        </form>
      </li>
    </menu>
  );
}
