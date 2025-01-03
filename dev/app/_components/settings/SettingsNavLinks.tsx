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
            "hover:bg-black-tertiery-bg p-3 rounded-lg block transition-colors duration-300",
            { "bg-black-tertiery-bg": pathname === "/settings" }
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
              "hover:bg-black-tertiery-bg p-3 rounded-lg block transition-colors duration-300",
              { "bg-black-tertiery-bg": pathname === "/settings/password" }
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
