import cn from "@/app/_utilities/cssConditional";
import { ClassValue } from "clsx";

type Props = { className?: ClassValue };
export default function Skeleton({ className }: Props) {
  return <div className={cn("bg-gray-200 animate-pulse", className)}></div>;
}
