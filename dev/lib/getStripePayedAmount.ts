import { notFound } from "next/navigation";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function getStripePayedAmount(id: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(id);
    return (session.amount_total || 0) / 100;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return notFound();
  }
}
