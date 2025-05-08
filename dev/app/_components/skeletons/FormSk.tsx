import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import FormButtonSk from "./FormButtonSk";

type Props = { children: ReactNode; className?: string; bgLight?: boolean };
export default function FormSk({ children, className, bgLight }: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr] sm:gap-x-6 sm:grid-cols-[auto_1fr] items-center",
        className
      )}
    >
      {children}
      <FormButtonSk bgLight={bgLight} />
    </div>
  );
}
