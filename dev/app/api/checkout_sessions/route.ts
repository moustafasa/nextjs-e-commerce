import { auth } from "@/auth";
import { getCartProducts } from "@/lib/CartControllers";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import unSecretStripe from "stripe";

export const POST = async () => {
  const headersList = await headers();

  const userSession = await auth();
  const cartProducts = await getCartProducts();

  if (!cartProducts || !userSession) {
    return NextResponse.json("there is no cart products", { status: 500 });
  }

  const line_items = cartProducts.map((cartProduct) => ({
    price_data: {
      currency: "egp",
      unit_amount:
        (cartProduct.product.price - (cartProduct.product.discount || 0)) * 100,
      product_data: {
        name: cartProduct.product.title,
        images: cartProduct.product.images,
        description: cartProduct.product.descriptions,
        metadata: {
          cartProductID: cartProduct._id.toString(),
        },
      },
    },
    quantity: cartProduct.qty,
  })) satisfies unSecretStripe.Checkout.SessionCreateParams.LineItem[];

  try {
    const stripe = new unSecretStripe(process.env.STRIPE_SECRET_KEY as string);
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${headersList.get(
        "origin"
      )}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headersList.get("origin")}/cart`,
      customer_email:
        userSession.provider === "credentials"
          ? undefined
          : userSession.user.email,
      metadata: {
        userId: userSession.user.userId.toString(),
      },
    });
    return NextResponse.redirect(session.url as string, { status: 303 });
  } catch (err) {
    return NextResponse.json((err as Error).message, { status: 500 });
  }
};
