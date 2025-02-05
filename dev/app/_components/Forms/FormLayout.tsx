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
};

export default function FormLayout({
  errors,
  children,
  heading,
  maxWidth = "700px",
}: Props) {
  return (
    <div className="px-3">
      <div
        className={cn(
          `capitalize  bg-black-secondary-bg mt-20 mx-auto text-white py-10 px-14 rounded-lg shadow-lg`
        )}
        style={{ maxWidth }}
      >
        <FormErrors errors={errors} />
        {heading && <PageHeader title={heading} />}
        {children}
      </div>
    </div>
  );
}
