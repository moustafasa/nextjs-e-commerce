import formatPrice from "@/app/_utilities/formatPrice";
import getStripePayedAmount from "@/lib/getStripePayedAmount";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};
export default async function page({ searchParams }: Props) {
  const params = await searchParams;
  if (!params.session_id) {
    return notFound();
  }
  const payedAmount = await getStripePayedAmount(params.session_id);
  return (
    <div className="max-w-[700px] bg-slate-100 dark:bg-black-tertiery-bg mx-auto mt-20 px-3 py-20 rounded-lg shadow-lg flex flex-col items-center justify-center gap-3">
      <FaCheckCircle className="text-7xl text-green-400 " />
      <p className="text-xl capitalize font-bold">
        thank you for your purchasing
      </p>
      <span className="capitalize">you payed {formatPrice(payedAmount)} </span>
      <Link
        href={"/shop-now"}
        className="capitalize flex items-center gap-2 justify-center mt-3 p-3 form-button"
      >
        go to shop more <FaArrowRight />
      </Link>
    </div>
  );
}
