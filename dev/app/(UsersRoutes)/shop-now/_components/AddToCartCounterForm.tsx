"use client";
import FormNumberInput from "@/app/_components/Forms/FormField/FormNumberInput";
import useAddToCartAction from "@/app/_utilities/useAddToCartAction";

type Props = { productId: string };
export default function AddToCartCounterForm({ productId }: Props) {
  const [state, formAction] = useAddToCartAction(productId);

  return (
    <form action={formAction}>
      <FormNumberInput error={state?.error} />
      <div className="text-sm w-28 capitalize text-red-error font-bold mt-1 px-2 ">
        {state?.error}
      </div>
      <button className="form-button block my-7">add to cart</button>
    </form>
  );
}
