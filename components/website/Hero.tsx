"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white">

      {/* Background */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Decorative circles */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold">

              🏥 Established in 2022

            </span>

            <h1 className="mt-8 text-5xl md:text-6xl font-extrabold leading-tight">

              Caring Beyond

              <span className="block text-cyan-200">

                Medicine

              </span>

            </h1>

            <p className="mt-8 text-lg text-blue-100 leading-8 max-w-2xl">

              Fatima Hospital provides compassionate, affordable and
              world-class healthcare with experienced specialists,
              advanced medical technology and patient-centered care.

            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link href="/appointment">

                <button className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition">

                  Book Appointment

                </button>

              </Link>

              <Link href="/doctors">

                <button className="border border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition">

                  Meet Our Doctors

                </button>

              </Link>

            </div>

            {/* Quick Stats */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-14">

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5">

                <h2 className="text-3xl font-bold">

                  20+

                </h2>

                <p className="text-blue-100 mt-2">

                  Doctors

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5">

                <h2 className="text-3xl font-bold">

                  15+

                </h2>

                <p className="text-blue-100 mt-2">

                  Departments

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5">

                <h2 className="text-3xl font-bold">

                  24/7

                </h2>

                <p className="text-blue-100 mt-2">

                  Emergency

                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5">

                <h2 className="text-3xl font-bold">

                  2022

                </h2>

                <p className="text-blue-100 mt-2">

                  Founded

                </p>

              </div>

            </div>

          </div>

          {/* Right */}

          <div>

            <div className="bg-white rounded-3xl shadow-2xl p-8">

              <h2 className="text-3xl text-blue-700 font-bold">

                Why Choose Fatima Hospital?

              </h2>

              <div className="space-y-6 mt-8">

                <div className="flex gap-4">

                  <div className="text-3xl">

                    👨‍⚕️

                  </div>

                  <div>

                    <h3 className="font-bold text-gray-800">

                      Expert Specialists

                    </h3>

                    <p className="text-gray-600">

                      More than 20 experienced doctors providing quality healthcare.

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="text-3xl">

                    🏥

                  </div>

                  <div>

                    <h3 className="font-bold text-gray-800">

                      15+ Departments

                    </h3>

                    <p className="text-gray-600">

                      Complete healthcare services under one roof.

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="text-3xl">

                    ❤️

                  </div>

                  <div>

                    <h3 className="font-bold text-gray-800">

                      Patient First

                    </h3>

                    <p className="text-gray-600">

                      Compassionate treatment with modern technology.

                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="text-3xl">

                    🚑

                  </div>

                  <div>

                    <h3 className="font-bold text-gray-800">

                      24/7 Emergency

                    </h3>

                    <p className="text-gray-600">

                      Emergency care available day and night.

                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-10 p-5 rounded-2xl bg-blue-50">

                <h3 className="font-bold text-blue-700 text-xl">

                  Chairman

                </h3>

                <p className="text-2xl font-bold text-gray-800 mt-2">

                  Wajahat Nazeer

                </p>

                <p className="text-gray-600 mt-2">

                  Leading Fatima Hospital with a vision of providing
                  affordable, compassionate and quality healthcare for everyone.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}