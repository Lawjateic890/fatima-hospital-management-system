"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Phone, HeartPulse } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full text-sm mb-6">
              🏥 Established in 2022
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              Caring Beyond
              <br />
              <span className="text-cyan-300">
                Medicine
              </span>
            </h1>

            <p className="mt-8 text-xl text-blue-100 leading-8 max-w-xl">
              Fatima Hospital provides compassionate, affordable and
              world-class healthcare with experienced specialists,
              advanced medical technology and patient-centered care.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                href="/appointments"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
              >
                Book Appointment
              </Link>

              <Link
                href="/doctors"
                className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition"
              >
                Meet Our Doctors
              </Link>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-5 mt-14">

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center">
                <HeartPulse className="mx-auto mb-2" />
                <h3 className="text-3xl font-bold">20+</h3>
                <p>Doctors</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center">
                <Calendar className="mx-auto mb-2" />
                <h3 className="text-3xl font-bold">15+</h3>
                <p>Departments</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 text-center">
                <Phone className="mx-auto mb-2" />
                <h3 className="text-3xl font-bold">24/7</h3>
                <p>Emergency</p>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="relative">

            <div className="absolute -top-8 -left-8 w-56 h-56 bg-cyan-400 rounded-full blur-3xl opacity-20"></div>

            <Image
              src="/images/hospital-hero.jpg"
              alt="Fatima Hospital"
              width={700}
              height={700}
              priority
              className="rounded-3xl shadow-2xl border-8 border-white object-cover"
            />

            <div className="absolute -bottom-8 left-8 bg-white text-gray-800 p-6 rounded-2xl shadow-xl">

              <h3 className="text-blue-700 font-bold text-xl">
                Why Choose Us?
              </h3>

              <ul className="mt-4 space-y-2 text-sm">
                <li>✔ 20+ Experienced Doctors</li>
                <li>✔ 15+ Medical Departments</li>
                <li>✔ Modern Equipment</li>
                <li>✔ Affordable Healthcare</li>
                <li>✔ 24/7 Emergency Services</li>
              </ul>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}