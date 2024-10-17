import { useFormStatus } from "react-dom";

type Props = { label: string; disabled?: boolean };
export default function SubmitButton({ label, disabled }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="sm:col-span-2 form-button mx-10 mt-6 sm:mt-2 disabled:pointer-events-none disabled:bg-blue-button-disabled"
      aria-disabled={disabled || pending}
      disabled={disabled || pending}
    >
      {pending ? "loading..." : label}
    </button>
  );
}
