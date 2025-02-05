import { auth } from "@/auth";
import { getCartProducts } from "@/lib/CartControllers";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import unSecretStripe from "stripe";

export const POST = auth(async (req) => {
  const headersList = await headers();

  const cartProducts = await getCartProducts();

  if (!cartProducts || !req.auth) {
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
        req.auth?.provider === "credentials" ? undefined : req.auth.user.email,
      metadata: {
        userId: req.auth.user.userId.toString(),
      },
    });
    return NextResponse.redirect(session.url as string, { status: 303 });
  } catch (err) {
    return NextResponse.json((err as Error).message, { status: 500 });
  }
});
