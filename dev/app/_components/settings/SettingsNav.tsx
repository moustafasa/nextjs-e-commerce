import { auth } from "@/auth";
import Link from "next/link";

export default async function SettingsNav() {
  const session = await auth();
  return (
    <ul className="space-y-1">
      <li>
        <Link
          className="hover:bg-black-tertiery-bg p-3 rounded-lg block transition-colors duration-300"
          href={"/settings"}
        >
          Profile
        </Link>
      </li>
      {session?.provider === "credentials" && (
        <li>
          <Link
            className="hover:bg-black-tertiery-bg p-3 rounded-lg block transition-colors duration-300"
            href={"/settings"}
          >
            password
          </Link>
        </li>
      )}
    </ul>
  );
}
