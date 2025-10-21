import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { amount } = await request.json(); // amount in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // e.g. product.price * 100
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Payment intent failed" },
      { status: 500 }
    );
  }
}
