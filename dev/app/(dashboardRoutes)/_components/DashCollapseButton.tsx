"use client";
import useSideNavCollapse from "@/app/_utilities/useSideNavCollapseContext";
import { FaBars } from "react-icons/fa";

export default function DashCollapseButton() {
  const [, setCollapse] = useSideNavCollapse();
  return (
    <button
      id="collapse"
      onClick={() => {
        setCollapse((prev) => !prev);
      }}
    >
      <FaBars />
    </button>
  );
}
