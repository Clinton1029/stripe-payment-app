import "./globals.css";
import Navbar from "./(components)/Navbar";
import Footer from "./(components)/Footer";

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
        <Navbar />
        <main className="flex-grow container py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
