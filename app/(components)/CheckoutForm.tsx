"use client";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      console.log("✅ Payment Method Created:", paymentMethod);
      alert("Payment method added successfully!");
      // TODO: Send paymentMethod.id to backend to complete charge
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md">
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
}
