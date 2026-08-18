"use client";

import Link from "next/link";
import { Ambulance, PhoneCall, CalendarPlus } from "lucide-react";

export default function EmergencyBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}

          <div>

            <div className="flex items-center gap-4 mb-6">

              <div className="bg-white/20 p-5 rounded-2xl">

                <Ambulance size={45} />

              </div>

              <div>

                <p className="uppercase tracking-widest text-red-100 font-semibold">
                  Emergency Services
                </p>

                <h2 className="text-4xl md:text-5xl font-bold">
                  24/7 Emergency Care
                </h2>

              </div>

            </div>

            <p className="text-lg leading-8 text-red-100">

              Fatima Hospital provides round-the-clock emergency medical
              services with experienced doctors, trained nursing staff,
              ambulance support, and advanced life-saving equipment.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <a
                href="tel:+925112345678"
                className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition"
              >
                <PhoneCall size={22} />
                Call Emergency
              </a>

              <Link
                href="/appointment"
                className="border-2 border-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-white hover:text-red-600 transition"
              >
                <CalendarPlus size={22} />
                Book Appointment
              </Link>

            </div>

          </div>

          {/* Right Side */}

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10">

            <h3 className="text-3xl font-bold mb-8">
              Emergency Contact
            </h3>

            <div className="space-y-6">

              <div>
                <p className="text-red-100">
                  Emergency Hotline
                </p>

                <h4 className="text-3xl font-bold">
                  +92 51 12345678
                </h4>
              </div>

              <div>
                <p className="text-red-100">
                  Ambulance Service
                </p>

                <h4 className="text-2xl font-semibold">
                  Available 24 Hours
                </h4>
              </div>

              <div>
                <p className="text-red-100">
                  Hospital Location
                </p>

                <h4 className="text-2xl font-semibold">
                  Fatima Hospital, Pakistan
                </h4>
              </div>

              <div>
                <p className="text-red-100">
                  Average Response
                </p>

                <h4 className="text-2xl font-semibold">
                  Under 10 Minutes
                </h4>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}