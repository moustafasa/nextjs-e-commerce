import cn from "@/app/_utilities/cssConditional";
import { ClassNameValue } from "tailwind-merge";

type Props = { classNames?: ClassNameValue };
export default function Skeleton({ classNames }: Props) {
  return (
    <div
      className={cn(
        "animate-pulse dark:bg-black-tertiery-bg bg-gray-input ",
        classNames
      )}
    ></div>
  );
}
