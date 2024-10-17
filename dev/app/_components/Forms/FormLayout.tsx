import FormErrors from "@/app/_components/Forms/FormErrors";
import { ReactNode } from "react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  formAction: (formData: FormData) => void;
  errors?: string[];
  children: ReactNode;
  heading: string;
};

export default function FormLayout({
  formAction,
  errors,
  children,
  heading,
}: Props) {
  return (
    <div className="px-3">
      <div className="capitalize max-w-[700px] bg-black-secondary-bg mt-20 mx-auto text-white p-7 rounded-lg shadow-lg">
        <form
          className="grid grid-cols-[1fr] sm:gap-x-6 sm:grid-cols-[auto_1fr] items-center px-5 "
          action={formAction}
        >
          <FormErrors errors={errors} />
          <h2 className=" sm:col-span-2 text-2xl font-bold text-center mb-10">
            <span className="relative before:absolute before:w-[60%] before:h-[1px] before:bg-white before:bottom-0 before:left-[20%]">
              {heading}
            </span>
          </h2>
          {children}
        </form>
      </div>
    </div>
  );
}
