"use client";

import {
  ShieldCheck,
  Stethoscope,
  Clock3,
  Building2,
  HeartHandshake,
  Microscope,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Healthcare",
    description:
      "Fatima Hospital has been providing safe, ethical and patient-focused healthcare since 2022.",
  },
  {
    icon: Clock3,
    title: "24/7 Emergency",
    description:
      "Emergency doctors, ambulance service and critical care are available day and night.",
  },
  {
    icon: Stethoscope,
    title: "20+ Specialist Doctors",
    description:
      "Experienced consultants from multiple specialties working together for the best patient outcomes.",
  },
  {
    icon: Building2,
    title: "15+ Departments",
    description:
      "Comprehensive medical departments offering complete healthcare under one roof.",
  },
  {
    icon: Microscope,
    title: "Modern Technology",
    description:
      "Advanced diagnostic equipment, digital healthcare systems and modern medical facilities.",
  },
  {
    icon: HeartHandshake,
    title: "Patient First",
    description:
      "Every patient receives compassionate care with personalized treatment plans and continuous support.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-20 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Excellence in Healthcare
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg">
            At Fatima Hospital, we combine experienced medical professionals,
            advanced technology and compassionate care to provide exceptional
            healthcare services for every patient.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group bg-slate-50 rounded-3xl p-8 hover:bg-blue-600 transition duration-300 hover:-translate-y-2 shadow hover:shadow-2xl"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center group-hover:bg-white mb-6">

                  <Icon
                    size={34}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600 group-hover:text-blue-100">
                  {feature.description}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}