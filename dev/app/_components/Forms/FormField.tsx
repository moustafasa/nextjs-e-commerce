import cn from "@/lib/cssConditional";
import { useFormStatus } from "react-dom";

type Props = { input: Input; errors: string[] | undefined };

const FormInput = ({ input, errors }: Props) => {
  const { pending } = useFormStatus();
  return (
    <input
      type={input.type}
      className={cn("block w-full form-input ring-1 ring-gray-input", {
        "ring-red-error focus:ring-red-error": errors?.[0],
      })}
      name={input.name}
      id={input.id}
      {...input.otherProps}
      title={errors?.[0]}
      disabled={pending}
      aria-disabled={pending}
    />
  );
};

export default function FormField({ input, errors }: Props) {
  return (
    <>
      <label className="mb-1 sm:mb-0" htmlFor={input.id}>
        {input.label}
      </label>
      <FormInput input={input} errors={errors} />
      <div
        title={errors?.[0]}
        className="sm:col-start-2 mb-4 sm:mb-6 text-sm px-3 empty:invisible h-6 overflow-hidden text-ellipsis whitespace-nowrap text-red-error"
      >
        {errors?.[0] || null}
      </div>
    </>
  );
}
