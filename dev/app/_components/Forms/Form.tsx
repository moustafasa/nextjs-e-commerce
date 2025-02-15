import cn from "@/app/_utilities/cssConditional";
import { ReactNode } from "react";
import NextForm from "next/form";

type Props = {
  // eslint-disable-next-line no-unused-vars
  formAction?: NonNullable<React.FormHTMLAttributes<HTMLFormElement>["action"]>;
  onSubmit?: React.FormHTMLAttributes<HTMLFormElement>["onSubmit"];
  children: ReactNode;
  className?: string;
};
export default function Form({
  formAction,
  onSubmit,
  children,
  className,
}: Props) {
  return (
    <NextForm
      className={cn(
        "grid grid-cols-[1fr] sm:gap-x-6 sm:grid-cols-[auto_1fr] items-center",
        className
      )}
      action={formAction || ""}
      onSubmit={onSubmit}
    >
      {children}
    </NextForm>
  );
}
