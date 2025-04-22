import cn from "@/app/_utilities/cssConditional";
import type { Props } from "./_Types";

export default function SelectInput({
  errors,
  input,
  value,
  defaultValue,
  ...other
}: Props<Select>) {
  return (
    <select
      className={cn(
        "block w-full capitalize form-input ring-1 ring-gray-input ",
        {
          "ring-red-error focus:ring-red-error": !!errors,
          "form-input-disabled": other.disabled,
        }
      )}
      name={input.name}
      id={input.id}
      multiple={input.multiple}
      value={value}
      defaultValue={defaultValue}
      {...input.otherProps}
      {...other}
    >
      {input.options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
