"use client";
import { OrderStatus, orderStatus } from "@/config/constants";
import FormField from "../../../../_components/Forms/FormField/FormField";
import { changeStatusAction } from "@/lib/OrderActions";
import { memo, useActionState, useEffect, useRef } from "react";

type Props = {
  orderId: string;
  initialStatus: OrderStatus;
};

function ChangeStatusForm({ orderId, initialStatus }: Props) {
  const [state, formAction] = useActionState(
    changeStatusAction.bind(undefined, orderId),
    { status: initialStatus }
  );

  const input = {
    type: "select",
    name: "status",
    id: "status",
    options: Object.keys(orderStatus).map((status) => ({
      value: orderStatus[status as keyof typeof orderStatus],
      label: orderStatus[status as keyof typeof orderStatus],
    })),
  } satisfies AllInputs;
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = state.status;
    }
  }, [state.status]);

  return (
    <form
      action={formAction}
      className=" flex gap-2 justify-start  items-center sm:justify-center"
    >
      <div className="sm:w-[40%] w-full">
        <FormField
          errors={undefined}
          input={input}
          defaultValue={state.status}
          noErrors
          ref={selectRef}
        />
      </div>
      <button className="capitalize form-button ">change</button>
    </form>
  );
}

export default memo(
  ChangeStatusForm,
  (prevProps, nextProps) => prevProps.initialStatus === nextProps.initialStatus
);
