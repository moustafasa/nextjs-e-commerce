import { useFormStatus } from "react-dom";

type Props = {
  label: string;
  showLoading?: boolean;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};
export default function FormButton({
  label,
  disabled,
  type = "submit",
  onClick,
  showLoading = true,
}: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type={type}
      className="sm:col-span-2 form-button mx-10 mt-6 sm:mt-2 disabled:pointer-events-none disabled:bg-blue-button-disabled"
      aria-disabled={disabled || pending}
      disabled={disabled || pending}
      onClick={onClick}
    >
      {pending && showLoading ? "loading..." : label}
    </button>
  );
}
