import cn from "@/app/_utilities/cssConditional";
import { Props } from "./_Types";
import { useFormStatus } from "react-dom";

export default function FormTextArea({ errors, input }: Props) {
  const { pending } = useFormStatus();
  return (
    <textarea
      className={cn(
        "resize-none block w-full  form-input ring-1 ring-gray-input",
        {
          "ring-red-error focus:ring-red-error": errors?.[0],
        }
      )}
      name={input.name}
      id={input.id}
      title={errors?.[0]}
      disabled={pending}
      aria-disabled={pending}
      rows={5}
    ></textarea>
  );
}
