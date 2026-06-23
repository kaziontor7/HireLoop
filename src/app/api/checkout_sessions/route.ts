import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { planPriceIds, stripe } from "../../../lib/stripe";
import { getUserSession } from "@/lib/core/session";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const formData = await request.formData();
    const planId = formData.get("plan_id") as string;
    const priceId = planPriceIds[planId];
    const user = await getUserSession(); // Assuming you have a function to get the user session

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      metadata: { planId },
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
