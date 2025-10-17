export default function Footer() {
  return (
    <footer className="bg-white mt-10 border-t py-4">
      <div className="container text-center text-gray-500">
        © {new Date().getFullYear()} StripeStore — All rights reserved.
      </div>
    </footer>
  );
}
