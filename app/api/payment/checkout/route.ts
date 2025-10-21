import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    console.log("✅ Checkout API HIT");

    const { priceId, items } = await request.json();
    console.log("📩 Received payload:", { priceId, items });

    let line_items: any[] = [];

    // ✅ Handle "Buy Now" flow using priceId
    if (priceId) {
      console.log("🛒 Using priceId (Buy Now flow)");
      line_items = [
        {
          price: priceId,
          quantity: 1,
        },
      ];
    }

    // ✅ Handle "Cart Checkout" flow using items[]
    else if (items && Array.isArray(items) && items.length > 0) {
      console.log("🛍️ Using cart items (Cart Checkout flow)");
      line_items = items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // ✅ Stripe uses cents
        },
        quantity: item.quantity || 1,
      }));
    }

    // ❌ Error if neither priceId nor items provided
    if (line_items.length === 0) {
      console.error("❌ No valid checkout data provided");
      return NextResponse.json(
        { error: "No priceId or items provided" },
        { status: 400 }
      );
    }

    console.log("📦 Sending line_items to Stripe:", line_items);

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
