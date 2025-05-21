"use client";

import cn from "@/app/_utilities/cssConditional";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SettingsNavSk from "./SettingsNavSk";

export default function SettingsNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <SettingsNavSk />;
  }

  return (
    <ul className="sm:space-y-1 flex items-center gap-3 justify-center mb-5 sm:block">
      <li>
        <Link
          className={cn(
            "dark:hover:bg-black-tertiery-bg hover:bg-slate-400 hover:text-white p-3 rounded-lg block transition-colors duration-300",
            {
              "dark:bg-black-tertiery-bg bg-slate-400 text-white":
                pathname === "/settings",
            }
          )}
          href={"/settings"}
        >
          Profile
        </Link>
      </li>
      {session?.provider === "credentials" && (
        <li>
          <Link
            className={cn(
              "dark:hover:bg-black-tertiery-bg hover:bg-slate-400 hover:text-white p-3 rounded-lg block transition-colors duration-300",
              {
                "dark:bg-black-tertiery-bg bg-slate-400 text-white":
                  pathname === "/settings/password",
              }
            )}
            href={"/settings/password"}
          >
            password
          </Link>
        </li>
      )}{" "}
    </ul>
  );
}
