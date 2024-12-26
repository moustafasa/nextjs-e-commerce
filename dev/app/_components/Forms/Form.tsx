import { ReactNode } from "react";

type Props = {
  // eslint-disable-next-line no-unused-vars
  formAction: (formData: FormData) => void;
  children: ReactNode;
};
export default function Form({ formAction, children }: Props) {
  return (
    <form
      className="grid grid-cols-[1fr] sm:gap-x-6 sm:grid-cols-[auto_1fr] items-center  "
      action={formAction}
    >
      {children}
    </form>
  );
}
