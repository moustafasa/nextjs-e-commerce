import { auth } from "@/auth";
import SettingsNavLinks from "./SettingsNavLinks";

export default async function SettingsNav() {
  const session = await auth();
  if (!session) return null;
  return (
    <ul className="space-y-1">
      <SettingsNavLinks session={session} />
    </ul>
  );
}
