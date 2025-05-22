"use server";

import { orderStatus, OrderStatus } from "@/config/constants";
import { changeOrderStatus } from "./OrderControllers";
import { revalidatePath } from "next/cache";

export async function changeStatusAction(
  orderId: string,
  previousState: { error?: string; status: OrderStatus },
  formData: FormData
) {
  const status = formData.get("status");
  if (!status) {
    return { error: "status is required", status: previousState.status };
  }
  if (!Object.values(orderStatus).includes(status as OrderStatus)) {
    return { error: "status is invalid", status: previousState.status };
  }

  try {
    const newStatus = await changeOrderStatus(orderId, status as OrderStatus);
    revalidatePath("/dashboard/orders");
    return { status: newStatus };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return { error: "status is invalid", status: previousState.status };
  }
}
