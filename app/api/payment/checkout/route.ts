import Stripe from "stripe";
import { NextResponse } from "next/server";

// ✅ Initialize Stripe with API version (recommended)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    // Parse the cart items from request body
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Map cart items to Stripe line_items
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100), // Convert dollars to cents
      },
      quantity: item.quantity,
    }));

    // ✅ Create Stripe checkout session (with automatic tax)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/cart`,

      // ✅ Enable automatic tax calculation
      automatic_tax: { enabled: true },

      // ✅ Stripe requires customer location for tax, so collect billing address
      billing_address_collection: "required",
    });

    // ✅ Return session URL to frontend
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: "Checkout creation failed" },
      { status: 500 }
    );
  }
}
