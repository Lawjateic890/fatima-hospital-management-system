"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Stethoscope,
  Phone,
  Mail,
  Building2,
} from "lucide-react";

interface Doctor {
  doctor_id: number;
  full_name: string;
  specialization: string;
  department: string;
  phone?: string;
  email?: string;
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const res = await fetch("https://fatima-hospital-backend-production.up.railway.app/doctors");
      const data = await res.json();

      setDoctors(data.slice(0, 4));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-600 font-semibold uppercase tracking-widest">
            Our Specialists
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            Meet Our Expert Doctors
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg">
            Our experienced consultants provide compassionate care using
            modern medical practices across multiple specialties.
          </p>

        </div>

        {loading ? (
          <div className="text-center py-20 text-xl text-gray-500">
            Loading doctors...
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

            {doctors.map((doctor) => (

              <div
                key={doctor.doctor_id}
                className="bg-slate-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >

                <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center">

                  <Stethoscope
                    size={42}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="text-2xl font-bold text-center mt-6 text-gray-800">
                  {doctor.full_name}
                </h3>

                <p className="text-blue-600 text-center font-semibold mt-2">
                  {doctor.specialization}
                </p>

                <div className="mt-6 space-y-3 text-gray-600">

                  <p className="flex items-center gap-2">
                    <Building2 size={18} />
                    {doctor.department}
                  </p>

                  {doctor.phone && (
                    <p className="flex items-center gap-2">
                      <Phone size={18} />
                      {doctor.phone}
                    </p>
                  )}

                  {doctor.email && (
                    <p className="flex items-center gap-2 break-all">
                      <Mail size={18} />
                      {doctor.email}
                    </p>
                  )}

                </div>

              </div>

            ))}

          </div>
        )}

        <div className="text-center mt-16">

          <Link href="/doctors">

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-semibold transition">
              View All Doctors
            </button>

          </Link>

        </div>

      </div>

    </section>
  );
}