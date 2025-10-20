import "./globals.css";
import Navbar from "./(components)/Navbar";
import Footer from "./(components)/Footer";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast"; // ✅ Added toast support

export const metadata = {
  title: "Stripe Payment Store",
  description: "Premium modern store built with Next.js & Stripe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Navbar />
          <Toaster position="top-right" /> {/* ✅ Global toast notifications */}
          <main className="flex-grow container py-10">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
