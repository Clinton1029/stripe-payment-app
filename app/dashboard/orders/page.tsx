// app/orders/page.tsx

"use client";
import Link from "next/link";

export default function OrdersPage() {
  // For now, we'll use placeholder data until we connect to Prisma.
  const dummyOrders = [
    {
      id: "order_001",
      product: "iPhone 15 Pro",
      amount: "$999.00",
      date: "2025-10-19",
      status: "Paid",
    },
    {
      id: "order_002",
      product: "MacBook Air M3",
      amount: "$1,299.00",
      date: "2025-10-17",
      status: "Paid",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        My Orders
      </h1>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-5 text-gray-600 font-medium">Order ID</th>
              <th className="py-3 px-5 text-gray-600 font-medium">Product</th>
              <th className="py-3 px-5 text-gray-600 font-medium">Amount</th>
              <th className="py-3 px-5 text-gray-600 font-medium">Date</th>
              <th className="py-3 px-5 text-gray-600 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 px-5 text-blue-600 font-medium">{order.id}</td>
                <td className="py-4 px-5">{order.product}</td>
                <td className="py-4 px-5 font-semibold">{order.amount}</td>
                <td className="py-4 px-5">{order.date}</td>
                <td className="py-4 px-5">
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600">
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
