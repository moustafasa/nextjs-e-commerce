"use client";
import useSideNavCollapse from "@/app/_utilities/useSideNavCollapseContext";
import SideBarLinks from "./SideBarLinks";
import cn from "@/app/_utilities/cssConditional";
import { useLayoutEffect } from "react";

export default function DashSideBar() {
  const [collapse] = useSideNavCollapse();

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--sideBar-w", collapse ? "50px" : "240px");
  }, [collapse]);

  return (
    <div
      className={cn(
        "fixed left-0 bg-black-nav w-sideBar-w h-[calc(100vh-theme('spacing.dashNav-h'))] top-dashNav-h"
      )}
    >
      <h2
        className={cn("p-3 capitalize text-2xl", {
          hidden: collapse,
        })}
      >
        pages
      </h2>
      <SideBarLinks />
    </div>
  );
}
