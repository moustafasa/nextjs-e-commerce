import { useFormStatus } from "react-dom";

type Props = { label: string };
export default function SubmitButton({ label }: Props) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="sm:col-span-2 form-button mx-10 mt-6 sm:mt-2 disabled:pointer-events-none disabled:bg-blue-button-disabled"
      aria-disabled={pending}
      disabled={pending}
    >
      {pending ? "loading..." : label}
    </button>
  );
}
