import useSideNavCollapse from "@/app/context/SideNavCollapseContext/useSideNavCollapseContext";

import { dashSideBarLinks } from "@/config/dashSideBarLinks";
import cn from "@/app/_utilities/cssConditional";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SideBarLinkSk from "./SideBarLinkSk";

export default function SideBarLinks() {
  const pathname = usePathname();
  const [collapse] = useSideNavCollapse();
  const { data, status } = useSession();

  const [filteredSideLinks, setFilteredSideLinks] = useState<SideBarLink[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredSideLinks(
        dashSideBarLinks.filter((link) =>
          link.role.find((role) => !!data.user.roles.includes(role))
        )
      );
    }
  }, [data]);

  return (
    <nav className={cn("px-6 flex flex-col gap-4", { "px-0 pt-5": collapse })}>
      {status === "loading" && <SideBarLinkSk />}

      {filteredSideLinks.map((link) => (
        <Link
          key={link.href}
          className={cn(
            "hover:bg-blue-links hover:text-white dark:text-gray-icons text-black-bg transition-colors duration-300 flex items-center gap-2 py-2 px-4 rounded-lg text-xl capitalize text-nowrap",
            { "bg-blue-links !text-white": pathname === link.href }
          )}
          href={link.href}
          title={collapse ? link.label : undefined}
        >
          <link.icon className="flex-shrink-0" />
          <span className={cn({ hidden: collapse })}>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
