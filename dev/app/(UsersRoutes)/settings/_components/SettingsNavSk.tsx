import Skeleton from "@/app/_components/skeletons/Skeleton";
import cn from "@/app/_utilities/cssConditional";

export default function SettingsNavSk() {
  return (
    <ul className="sm:space-y-1 flex items-center gap-3 justify-center mb-5 sm:block">
      <li>
        <div
          className={cn(
            "p-3 rounded-lg block transition-colors duration-300 max-sm:w-28"
          )}
        >
          <Skeleton classNames="sk-text" />
        </div>
      </li>
      <li>
        <div
          className={cn(
            "p-3 rounded-lg block transition-colors duration-300 max-sm:w-28"
          )}
        >
          <Skeleton classNames="sk-text" />
        </div>
      </li>
    </ul>
  );
}
