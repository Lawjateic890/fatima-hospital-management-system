"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Hospital */}

          <div>

            <h2 className="text-2xl font-bold text-white">
              Fatima Hospital
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Fatima Hospital is committed to providing
              compassionate, affordable and modern healthcare
              services for patients across Islamabad.
            </p>

            <p className="mt-5 text-blue-400 font-semibold">
              Caring Beyond Medicine
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <div className="space-y-3">

              <Link href="/" className="block hover:text-blue-400">
                Home
              </Link>

              <Link href="/about" className="block hover:text-blue-400">
                About Us
              </Link>

              <Link href="/services" className="block hover:text-blue-400">
                Services
              </Link>

              <Link href="/departments" className="block hover:text-blue-400">
                Departments
              </Link>

              <Link href="/doctors" className="block hover:text-blue-400">
                Doctors
              </Link>

              <Link href="/appointment" className="block hover:text-blue-400">
                Book Appointment
              </Link>

              <Link href="/contact" className="block hover:text-blue-400">
                Contact
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Contact Us
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <MapPin className="text-blue-500 mt-1" size={20} />

                <p>
                  Main Islamabad Expressway,
                  <br />
                  Ghauri Model Town,
                  <br />
                  Islamabad 44000
                </p>

              </div>

              <div className="flex gap-3">

                <Mail className="text-blue-500 mt-1" size={20} />

                <a
                  href="mailto:fatimahospitalofficial.pk@gmail.com"
                  className="hover:text-blue-400 break-all"
                >
                  fatimahospitalofficial.pk@gmail.com
                </a>

              </div>

              <div className="flex gap-3">

                <Phone className="text-blue-500 mt-1" size={20} />

                <p>Coming Soon</p>

              </div>

            </div>

          </div>

          {/* Working Hours */}

          <div>

            <h3 className="text-xl font-semibold text-white mb-5">
              Working Hours
            </h3>

            <div className="space-y-4">

              <div className="flex gap-3">

                <Clock3 className="text-blue-500 mt-1" size={20} />

                <div>

                  <p>Monday - Sunday</p>

                  <p className="text-gray-400">
                    Open 24 Hours
                  </p>

                </div>

              </div>

              <a
                href="https://share.google/WoGLcsteUGek7sIU3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
              >
                View on Google Maps
              </a>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2026 Fatima Hospital. All Rights Reserved.
          </p>

          <p className="text-sm text-gray-500">
            Founded in 2022
          </p>

        </div>

      </div>

    </footer>
  );
}