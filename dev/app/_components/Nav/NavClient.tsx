"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { FaBars } from "react-icons/fa6";
import NavLinks from "./NavLinks";
import SearchBox from "./SearchBox";

export default function NavClient() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const blurHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#collapse")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", blurHandler);
    return () => {
      document.removeEventListener("click", blurHandler);
    };
  }, []);

  return (
    <>
      <Logo />
      <button
        id="collapse"
        className="-ms-3 sm:ms-4 md:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <FaBars />
      </button>
      <NavLinks isOpen={isOpen} />
      <SearchBox isOpen={isOpen} />
    </>
  );
}
