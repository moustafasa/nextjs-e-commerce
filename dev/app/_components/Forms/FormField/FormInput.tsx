"use client";
import cn from "@/app/_utilities/cssConditional";
import { useFormStatus } from "react-dom";
import type { Props } from "./_Types";

const FormInput = ({ input, errors, ...others }: Props<Input>) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex gap-3">
      <input
        type={input.type}
        className={cn("block w-full form-input ring-1 ring-gray-input", {
          "ring-red-error focus:ring-red-error": errors?.[0],
          "form-input-disabled": others.disabled,
        })}
        name={input.name}
        id={input.id}
        title={errors?.[0]}
        disabled={pending || others.disabled}
        aria-disabled={pending || others.disabled}
        {...input.otherProps}
        {...others}
      />
      {input.suffex && (
        <span className={cn({ "text-gray-input": others.disabled })}>
          pounds
        </span>
      )}
    </div>
  );
};

export default FormInput;
