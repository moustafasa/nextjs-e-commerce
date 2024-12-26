"use client";
import Image from "next/image";
import profile from "@/images/profile.png";
import { FaAngleDown } from "react-icons/fa6";
import ProfileMenu from "./ProfileMenu";
import { useEffect, useState } from "react";
import cn from "@/app/_utilities/cssConditional";
import { useSession } from "next-auth/react";

type Props = { data: ReturnType<typeof useSession>["data"] };
export default function Profile({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  // const { data } = useSession();
  useEffect(() => {
    const blurHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#profile")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", blurHandler);
    return () => {
      document.removeEventListener("click", blurHandler);
    };
  }, []);
  return (
    <div className="relative">
      <button
        id="profile"
        className={cn(
          "flex items-center gap-1 transition-colors duration-300 hover:bg-menu-transparent-black py-1 px-2 rounded-3xl",
          { "bg-menu-transparent-black": isOpen }
        )}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        <div className="rounded-full overflow-hidden w-[50px] h-[50px] flex items-center justify-center">
          <Image
            className="max-w-full max-h-full object-cover"
            src={data?.user.image || profile}
            width={data?.user.image ? 55 : undefined}
            height={data?.user.image ? 55 : undefined}
            alt="profile"
            priority
          />
        </div>
        <FaAngleDown />
      </button>
      <ProfileMenu isOpen={isOpen} data={data} />
    </div>
  );
}
