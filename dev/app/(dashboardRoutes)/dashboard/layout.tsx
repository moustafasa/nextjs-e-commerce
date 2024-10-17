import { ReactNode } from "react";
import DashNav from "../../_components/Nav/DashNav";
import DashSideBar from "../../_components/dashboard/DashSideBar";
import SideNavCollapseContextProvider from "@/app/_utilities/sideNavCollapseContext";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="pt-dashNav-h ps-sideBar-w text-white">
      <SideNavCollapseContextProvider>
        <DashNav />
        <DashSideBar />
      </SideNavCollapseContextProvider>
      <div className="p-3 max-w-full">{children}</div>
    </div>
  );
}
