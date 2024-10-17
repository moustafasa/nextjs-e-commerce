import cn from "@/app/_utilities/cssConditional";
import type { Props } from "./_Types";

export default function SelectInput({
  errors,
  input,
  ...other
}: Props<Select>) {
  return (
    <select
      className={cn("block w-full form-input ring-1 ring-gray-input ", {
        "ring-red-error focus:ring-red-error": !!errors,
      })}
      name={input.name}
      id={input.id}
      multiple={input.multiple}
      {...input.otherProps}
      {...other}
    >
      {input.options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
