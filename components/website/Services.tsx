"use client";

import Link from "next/link";
import {
  HeartPulse,
  Brain,
  Bone,
  Baby,
  Ear,
  Sparkles,
  Activity,
  ScanHeart,
} from "lucide-react";

const departments = [
  {
    name: "Cardiology",
    icon: HeartPulse,
    description: "Advanced diagnosis and treatment for heart diseases.",
  },
  {
    name: "Neurology",
    icon: Brain,
    description: "Expert care for brain, spine and nervous system disorders.",
  },
  {
    name: "Orthopedics",
    icon: Bone,
    description: "Comprehensive treatment for bones, joints and muscles.",
  },
  {
    name: "Pediatrics",
    icon: Baby,
    description: "Dedicated healthcare services for infants and children.",
  },
  {
    name: "ENT",
    icon: Ear,
    description: "Treatment for ear, nose and throat conditions.",
  },
  {
    name: "Dermatology",
    icon: Sparkles,
    description: "Modern skin, hair and cosmetic treatments.",
  },
  {
    name: "Emergency",
    icon: Activity,
    description: "24/7 emergency and critical care services.",
  },
  {
    name: "Radiology",
    icon: ScanHeart,
    description: "MRI, CT Scan, X-Ray and Ultrasound facilities.",
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Our Departments
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Specialized Medical Departments
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg">
            Fatima Hospital offers more than 15 specialized departments equipped
            with experienced consultants and advanced medical technology to
            provide complete healthcare services under one roof.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {departments.map((department, index) => {

            const Icon = department.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                  <Icon
                    size={34}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="text-2xl font-bold text-gray-800 mt-6">
                  {department.name}
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                  {department.description}
                </p>

              </div>
            );
          })}

        </div>

        <div className="text-center mt-16">

          <Link href="/departments">

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold transition">
              View All Departments
            </button>

          </Link>

        </div>

      </div>

    </section>
  );
}