import FormErrors from "@/app/_components/Forms/FormErrors";
import cn from "@/app/_utilities/cssConditional";
import { ReactNode } from "react";

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
        {heading && (
          <h2 className="text-2xl font-bold text-center mb-9">
            <span className="relative before:absolute before:w-[60%] before:h-[1px] before:bg-white before:bottom-0 before:left-[20%]">
              {heading}
            </span>
          </h2>
        )}
        {children}
      </div>
    </div>
  );
}
