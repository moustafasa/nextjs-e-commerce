import FormErrors from "@/app/_components/Forms/FormErrors";
import { ReactNode } from "react";

type Props = {
  errors?: string[];
  children: ReactNode;
  heading: string;
  siblingForm?: ReactNode;
};

export default function FormLayout({ errors, children, heading }: Props) {
  return (
    <div className="px-3">
      <div className="capitalize max-w-[700px] bg-black-secondary-bg mt-20 mx-auto text-white p-7 rounded-lg shadow-lg">
        <FormErrors errors={errors} />
        <h2 className="text-2xl font-bold text-center mb-10">
          <span className="relative before:absolute before:w-[60%] before:h-[1px] before:bg-white before:bottom-0 before:left-[20%]">
            {heading}
          </span>
        </h2>
        {children}
      </div>
    </div>
  );
}
