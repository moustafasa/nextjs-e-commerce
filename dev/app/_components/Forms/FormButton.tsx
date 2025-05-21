"use client";
import cn from "@/app/_utilities/cssConditional";
import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  showLoading?: boolean;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  className?: string;
};
export default function FormButton({
  label,
  disabled,
  type = "submit",
  onClick,
  showLoading = true,
  className,
}: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type={type}
      className={cn(
        "sm:col-span-2 form-button w-[calc(100%-2.5rem)] mx-auto mt-6 sm:mt-2 disabled:pointer-events-none disabled:bg-blue-button-disabled",
        className
      )}
      aria-disabled={disabled || pending}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {pending && showLoading ? "loading..." : label}
    </button>
  );
}
