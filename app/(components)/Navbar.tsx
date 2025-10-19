"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react"; // ✅ Icon imported

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        MyStore
      </Link>

      {/* Nav Links */}
      <div className="flex space-x-6 items-center">
        <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
          Home
        </Link>
        <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
          Products
        </Link>
        
        {/* ✅ Cart Icon Link */}
        <Link
          href="/cart"
          className="flex items-center hover:text-blue-600 transition"
        >
          <ShoppingCart className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
}
