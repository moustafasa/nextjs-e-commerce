"use client";
import { FaMinus, FaPlus } from "react-icons/fa";
import FormInput from "./FormInput";
import { useEffect, useRef, useState } from "react";

type Props = {
  error?: string;
  value?: number;
  max?: number;
  submitOnChange?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: number | "") => void;
};
export default function FormNumberInput({
  error,
  value,
  max,
  submitOnChange,
}: Props) {
  const [amount, setAmount] = useState<"" | number>(value || 0);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (submitOnChange) {
      const handler = setTimeout(() => {
        if (amount !== "") {
          inputRef.current?.form?.requestSubmit();
        }
      }, 300); // 300ms debounce time

      return () => {
        clearTimeout(handler);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, submitOnChange]);

  return (
    <div className="w-28 relative">
      <button
        type="button"
        onClick={() => {
          setAmount(max ? Math.min(max, (amount || 0) + 1) : (amount || 0) + 1);
        }}
        className="absolute flex top-0 left-0 items-center justify-center  w-[30px] h-full text-sm  px-[5px]"
      >
        <FaPlus />
      </button>
      <FormInput
        errors={error ? [error] : []}
        input={{ type: "number", name: "amount", id: "amount" }}
        className="[&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none !px-[30px] block text-center font-bold dark:!text-white "
        pattern="[0-1]"
        value={amount === "" ? value : amount}
        onChange={(e) => {
          setAmount(e.target.value !== "" ? +e.target.value : "");
        }}
        ref={inputRef}
      />
      <button
        type="button"
        onClick={() => {
          setAmount(Math.max(1, (amount || 0) - 1));
        }}
        className="absolute flex items-center justify-center w-[30px]  right-0 top-0 h-full text-sm px-[5px]"
      >
        <FaMinus />
      </button>
    </div>
  );
}
