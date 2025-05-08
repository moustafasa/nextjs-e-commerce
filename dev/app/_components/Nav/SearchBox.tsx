"use client";
import cn from "@/app/_utilities/cssConditional";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { FaSearch } from "react-icons/fa";

type Props = { isOpen: boolean; isNav?: boolean };
export default function SearchBox({ isOpen, isNav }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const timoutHandler = useRef<NodeJS.Timeout | undefined>(undefined);
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeout = setTimeout(() => {
      if (e.target.value) newSearchParams.set("search", e.target.value);
      else newSearchParams.delete("search");
      newSearchParams.delete("page");
      router.push(
        `${
          !pathname.includes("dashboard") ? "/shop-now" : ""
        }?${newSearchParams.toString()}`
      );
    }, 100);
    if (timoutHandler.current) {
      clearTimeout(timoutHandler.current);
    }
    timoutHandler.current = timeout;
  };

  return (
    <div
      id="collapse"
      className={cn(
        " relative  bg-inherit mt-5 lg:mt-0 order-3 w-full lg:order-none  lg:w-auto lg:ps-0  bg-white dark:bg-transparent",
        {
          " mx-3 hidden mt-3 lg:mt-0 md:block  lg:mx-auto": isNav,
          block: isOpen && isNav,
        }
      )}
    >
      <input
        type="text"
        id="search"
        name="search"
        placeholder="type anything to search"
        className=" rounded-full border-[1px] border-black-bg placeholder:text-gray-icons  capitalize ps-5 pe-9 py-1 dark:bg-move-input  focus:outline-none focus:ring-2 focus:ring-blue-links w-full focus:border-white dark:border-none"
        onChange={inputHandler}
        defaultValue={searchParams.get("search") || ""}
      />
      <label
        htmlFor="search"
        className="absolute right-3 top-1/2 -translate-y-1/2 "
      >
        <FaSearch />
      </label>
    </div>
  );
}
