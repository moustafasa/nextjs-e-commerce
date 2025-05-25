"use client";
import FormNumberInput from "../../../_components/Forms/FormField/FormNumberInput";
import { useActionState, useEffect } from "react";
import { changeCartProductQtyAction } from "@/lib/CartActions";
import Form from "next/form";
import cn from "@/app/_utilities/cssConditional";
import useCheckOutContext from "@/app/context/checkOutErrorsContext.tsx/useCheckOutContext";

type Props = { qty: number; stockNumber: number; productId: string };
export default function ChangeProductQty({
  qty,
  stockNumber,
  productId,
}: Props) {
  const [state, formAction, isPending] = useActionState(
    changeCartProductQtyAction.bind(null, productId),
    undefined
  );
  const error = qty > stockNumber ? "out of stock" : state?.error;
  const [, setErrors] = useCheckOutContext();

  useEffect(() => {
    if (error) {
      setErrors((prev) => [...prev, { [productId]: error }]);
    } else {
      setErrors((prev) =>
        prev.filter((error) => error[productId] === undefined)
      );
    }
  }, [error, productId, setErrors]);

  return (
    <Form
      action={formAction}
      className="m-auto w-max px-3 flex flex-col items-center "
    >
      <div className="flex items-center gap-3">
        <span className={cn("w-4 invisible")}></span>
        <FormNumberInput
          value={qty}
          error={qty > stockNumber ? "out of stock" : state?.error}
          submitOnChange
          max={stockNumber}
        />
        <div
          className={cn(
            "w-4 h-4   invisible rounded-full border-2 border-white  border-dotted",
            { "visible animate-spin": isPending }
          )}
        ></div>
      </div>
      <div
        className={cn(
          "text-xs mt-2 text-red-error font-bold h-4 w-56 transition-opacity",
          {
            "opacity-0": !error,
            "opacity-100": !!error,
          }
        )}
      >
        {error}
      </div>
    </Form>
  );
}
