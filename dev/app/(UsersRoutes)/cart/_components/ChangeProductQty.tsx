"use client";
import FormNumberInput from "../../../_components/Forms/FormField/FormNumberInput";
import { useActionState } from "react";
import { changeCartProductQtyAction } from "@/lib/CartActions";
import Form from "next/form";

type Props = { qty: number; stockNumber: number; productId: string };
export default function ChangeProductQty({
  qty,
  stockNumber,
  productId,
}: Props) {
  const [state, formAction] = useActionState(
    changeCartProductQtyAction.bind(null, productId),
    undefined
  );

  return (
    <Form action={formAction} className="m-auto w-max px-3">
      <FormNumberInput
        value={qty}
        max={stockNumber}
        error={state?.error}
        submitOnChange
      />
    </Form>
  );
}
