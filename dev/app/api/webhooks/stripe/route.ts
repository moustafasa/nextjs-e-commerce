import { completeCartCheckout } from "@/lib/CartControllers";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const secret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const POST = async (req: Request) => {
  const sig = req.headers.get("stripe-signature") as string;
  const body = await req.arrayBuffer();
  const buf = Buffer.from(body);
  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, secret);
  } catch (err) {
    console.log(err);
    return Response.json("webhook error: " + (err as Error).message, {
      status: 400,
    });
  }
  switch (event.type) {
    case "checkout.session.completed": {
      if (!event.data.object.metadata?.userId) {
        break;
      }
      await completeCartCheckout(event.data.object.metadata.userId);
      break;
    }
  }
  return Response.json({ received: true }, { status: 200 });
};
