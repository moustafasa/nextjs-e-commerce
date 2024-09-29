"use client";
import { dashSideBarLinks } from "@/config/dashSideBarLinks";
import cn from "@/lib/cssConditional";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarLinks() {
  const pathname = usePathname();
  return (
    <nav className="px-6 flex flex-col gap-4">
      {dashSideBarLinks.map((link) => (
        <Link
          key={link.href}
          className={cn(
            "hover:bg-blue-links hover:text-white text-gray-icons transition-colors duration-300 flex items-center gap-2 py-2 px-4 rounded-lg text-xl capitalize",
            { "bg-blue-links text-white": pathname === link.href }
          )}
          href={link.href}
        >
          <link.icon />
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
