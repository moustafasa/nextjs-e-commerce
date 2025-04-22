import { cn } from "@/lib/utils";

type Props = { classNames?: string };
export default function Skeleton({ classNames }: Props) {
  return (
    <div
      className={cn("animate-pulse bg-black-tertiery-bg ", classNames)}
    ></div>
  );
}
