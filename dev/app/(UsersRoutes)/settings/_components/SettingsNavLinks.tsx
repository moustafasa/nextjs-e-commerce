"use client";

import cn from "@/app/_utilities/cssConditional";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { session: Session };
export default function SettingsNavLinks({ session }: Props) {
  const pathname = usePathname();

  return (
    <>
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
      )}
    </>
  );
}
