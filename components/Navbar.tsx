import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold text-blue-700"
        >
          🏥 Fatima Hospital
        </Link>

        {/* Public Navigation */}
        <div className="hidden md:flex gap-8 text-lg font-medium">

          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link
            href="/departments"
            className="hover:text-blue-600 transition"
          >
            Departments
          </Link>

          <Link
            href="/doctors"
            className="hover:text-blue-600 transition"
          >
            Doctors
          </Link>

          <Link
            href="/appointments"
            className="hover:text-blue-600 transition"
          >
            Book Appointment
          </Link>

          <Link
            href="/contact"
            className="hover:text-blue-600 transition"
          >
            Contact
          </Link>

        </div>
      </div>
    </nav>
  );
}