"use client";
import FormInput from "./FormInput";
import type { Props } from "./_Types";
import SelectInput from "./FormSelect";
import FileInput from "./FileInput";
import cn from "@/app/_utilities/cssConditional";
import FormTextArea from "./FormTextArea";

export default function FormField<T extends AllInputs>({
  input,
  errors,
  ...others
}: Props<T>) {
  return (
    <>
      {input.type === "file" ? (
        <FileInput input={input} {...(others as FileInputOther)} />
      ) : (
        <>
          <label
            className={cn("mb-1 sm:mb-0", {
              "self-start": input.type === "textarea",
            })}
            htmlFor={input.id}
          >
            {input.label}
          </label>
          {input.type === "select" ? (
            <SelectInput
              input={input}
              errors={errors}
              {...(others as React.ComponentProps<"select">)}
            />
          ) : input.type === "textarea" ? (
            <FormTextArea
              input={input}
              errors={errors}
              {...(others as TextAreaOther)}
            />
          ) : (
            <FormInput
              input={input}
              errors={errors}
              {...(others as React.ComponentProps<"input">)}
            />
          )}
        </>
      )}
      <div
        title={errors?.[0]}
        className={cn(
          "mb-4 sm:mb-6 h-6 text-sm px-3 empty:invisible overflow-hidden text-ellipsis whitespace-nowrap text-red-error",
          {
            "sm:col-start-2 ": input.type !== "file",
            "sm:col-span-2 mt-1": input.type === "file",
          }
        )}
      >
        {errors?.[0] || null}
      </div>
    </>
  );
}
