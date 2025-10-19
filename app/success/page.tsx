// app/success/page.tsx

"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    console.log("Payment successful!");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-4xl">
            ✅
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Payment Successful 🎉</h1>
        <p className="text-gray-600 mt-3">
          Thank you for your purchase! Your payment has been processed successfully.
        </p>

        <div className="mt-8 space-y-4">
          <Link
            href="/"
            className="block w-full py-3 rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
          >
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="block w-full py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
