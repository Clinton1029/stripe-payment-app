import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    console.log("✅ Checkout API HIT");

    const { items } = await request.json();
    console.log("🛒 Received items:", items);

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    console.log("📦 Sending to Stripe:", line_items);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success`,
      cancel_url: `${request.headers.get("origin")}/cart`,
    });

    console.log("✅ Stripe session created:", session.url);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("❌ Stripe Checkout Error:", error);
    return NextResponse.json(
      { error: "Checkout creation failed" },
      { status: 500 }
    );
  }
}
