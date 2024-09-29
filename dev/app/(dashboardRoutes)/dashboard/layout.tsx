import { ReactNode } from "react";
import DashNav from "../../_components/Nav/DashNav";
import DashSideBar from "../../_components/dashboard/DashSideBar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="pt-dashNav-h ps-sidBar-w text-white">
      <DashNav />
      <div className="flex-1 flex max-h-full">
        <DashSideBar />
        <div className="flex-1 p-3 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
