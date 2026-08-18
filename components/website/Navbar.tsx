"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, CalendarPlus } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Departments", href: "/departments" },
    { name: "Doctors", href: "/doctors" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone size={15} />
              <span>+92 51 111 111 111</span>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Mail size={15} />
              <span>info@fatimahospital.com</span>
            </div>
          </div>

          <span className="hidden md:block font-semibold">
            24/7 Emergency Services
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-[9999] bg-white border-b border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Fatima Hospital"
                width={55}
                height={55}
                priority
              />

              <div>
                <h1 className="text-2xl font-bold text-blue-700">
                  Fatima Hospital
                </h1>

                <p className="text-xs text-gray-500">
                  Caring Beyond Medicine
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-800 hover:text-blue-600 font-semibold transition duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/login"
                className="font-semibold text-gray-800 hover:text-blue-600 transition"
              >
                Login
              </Link>

              <Link
                href="/appointments"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition"
              >
                <CalendarPlus size={18} />
                Book Appointment
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-800"
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="flex flex-col gap-5 p-6">

              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-semibold text-gray-800 hover:text-blue-600"
                >
                  {link.name}
                </Link>
              ))}

              <Link
                href="/login"
                className="font-semibold text-gray-800"
              >
                Login
              </Link>

              <Link
                href="/appointments"
                className="rounded-xl bg-blue-600 py-3 text-center font-semibold text-white hover:bg-blue-700"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}