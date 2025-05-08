import FormErrors from "@/app/_components/Forms/FormErrors";
import cn from "@/app/_utilities/cssConditional";
import { ReactNode } from "react";
import PageHeader from "../PageHeader";

type Props = {
  errors?: string[];
  children: ReactNode;
  heading?: string;
  siblingForm?: ReactNode;
  maxWidth?: string;
  className?: string;
};

export default function FormLayout({
  errors,
  children,
  heading,
  className,
  maxWidth = "700px",
}: Props) {
  return (
    <div className="px-3">
      <div
        className={cn(
          `capitalize  dark:bg-black-secondary-bg mt-20 mx-auto bg-slate-100 py-10 px-14 rounded-lg shadow-lg`,
          className
        )}
        style={{ maxWidth }}
      >
        <FormErrors errors={errors} />
        {heading && <PageHeader title={heading} className="text-2xl mb-9" />}
        {children}
      </div>
    </div>
  );
}
