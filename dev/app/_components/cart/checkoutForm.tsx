"use client";
import { loadStripe } from "@stripe/stripe-js";
import FormButton from "../Forms/FormButton";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CheckoutForm() {
  return (
    <form
      className="mt-7 px-5 flex items-center justify-center [&>button]:w-full text-2xl"
      action="/api/checkout_sessions"
      method="POST"
    >
      <FormButton label="checkout" type="submit" />
    </form>
  );
}
