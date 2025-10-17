"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          StripeStore
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/success" className="hover:text-primary">Orders</Link>
        </div>
      </div>
    </nav>
  );
}
