import SideBarLinks from "./SideBarLinks";

export default function DashSideBar() {
  return (
    <div className="fixed left-0 bg-black-nav w-sidBar-w h-[calc(100vh-theme('spacing.dashNav-h'))] top-dashNav-h  ">
      <h2 className="p-3 capitalize text-2xl">pages</h2>
      <SideBarLinks />
    </div>
  );
}
