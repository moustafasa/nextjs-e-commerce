"use client";

import { usePathname } from "next/navigation";

export default function SettingsHeading() {
  const pathname = usePathname();
  return (
    <h2 className="row-start-1 col-start-2 text-xl font-bold mb-5   ">
      {pathname === "/settings" ? "my profile" : "change password"}
    </h2>
  );
}
