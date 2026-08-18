"use client";

import CountUp from "react-countup";
import { Users, Stethoscope, Building2, CalendarDays } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: 50000,
    suffix: "+",
    title: "Happy Patients",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Stethoscope,
    number: 20,
    suffix: "+",
    title: "Specialist Doctors",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Building2,
    number: 15,
    suffix: "+",
    title: "Departments",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: CalendarDays,
    number: 2022,
    suffix: "",
    title: "Established",
    color: "bg-red-100 text-red-600",
  },
];

export default function Statistics() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-700 to-cyan-600 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold">
            Fatima Hospital in Numbers
          </h2>

          <p className="mt-4 text-blue-100 max-w-3xl mx-auto text-lg">
            Since our establishment in 2022, Fatima Hospital has remained
            committed to delivering exceptional healthcare through experienced
            doctors, advanced technology, and compassionate patient care.
          </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-2xl p-8 text-center hover:-translate-y-2 transition duration-300"
              >
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${item.color}`}
                >
                  <Icon size={34} />
                </div>

                <h3 className="text-5xl font-bold mt-6 text-gray-900">

                  <CountUp
                    end={item.number}
                    duration={2.5}
                    separator=","
                  />

                  {item.suffix}

                </h3>

                <p className="mt-4 text-gray-600 font-semibold text-lg">
                  {item.title}
                </p>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}