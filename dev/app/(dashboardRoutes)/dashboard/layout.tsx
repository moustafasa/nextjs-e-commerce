import { ReactNode } from "react";
import DashNav from "../_components/DashNav";
import DashSideBar from "../_components/DashSideBar";
import SideNavCollapseContextProvider from "@/app/context/SideNavCollapseContext/sideNavCollapseContext";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="pt-dashNav-h md:ps-dash-side-bar-w ">
      <SideNavCollapseContextProvider>
        <DashNav />
        <DashSideBar />
      </SideNavCollapseContextProvider>
      <div className="p-3 max-w-full ">{children}</div>
    </div>
  );
}
