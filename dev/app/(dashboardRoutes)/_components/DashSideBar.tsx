"use client";
import useSideNavCollapse from "@/app/_utilities/useSideNavCollapseContext";
import SideBarLinks from "./SideBarLinks";
import cn from "@/app/_utilities/cssConditional";
import { useLayoutEffect } from "react";

export default function DashSideBar() {
  const [collapse] = useSideNavCollapse();

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--dash-side-bar-w", collapse ? "50px" : "240px");
  }, [collapse]);

  return (
    <div
      className={cn(
        "fixed md:left-0 bg-white dark:bg-black-nav shadow-lg  w-dash-side-bar-w h-[calc(100vh-theme('spacing.dashNav-h'))] top-dashNav-h transition-all duration-300 -left-full z-50",
        {
          "left-0": !collapse,
        }
      )}
    >
      <h2
        className={cn("p-3 capitalize text-2xl", {
          "md:hidden": collapse,
        })}
      >
        pages
      </h2>
      <SideBarLinks />
    </div>
  );
}
