import Skeleton from "@/app/_components/skeletons/Skeleton";
import { cn } from "@/lib/utils";

export default function SettingsNavSk() {
  return (
    <ul className="space-y-1">
      <li>
        <div
          className={cn("p-3 rounded-lg block transition-colors duration-300")}
        >
          <Skeleton classNames="sk-text" />
        </div>
        <div
          className={cn("p-3 rounded-lg block transition-colors duration-300")}
        >
          <Skeleton classNames="sk-text" />
        </div>
      </li>
    </ul>
  );
}
