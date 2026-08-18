"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Muhammad Ali",
    treatment: "Cardiology Patient",
    review:
      "The doctors were extremely professional and explained every step of my treatment. The staff was supportive and the facilities were excellent.",
  },
  {
    name: "Ayesha Khan",
    treatment: "Maternity Care",
    review:
      "I had an amazing experience throughout my pregnancy. The doctors and nurses made me feel comfortable and cared for at every stage.",
  },
  {
    name: "Ahmed Raza",
    treatment: "Orthopedic Patient",
    review:
      "From diagnosis to recovery, everything was handled professionally. The hospital is clean, modern, and the doctors are highly experienced.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="uppercase tracking-widest text-blue-600 font-semibold">
            Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-3">
            What Our Patients Say
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg">
            Patient satisfaction is our highest priority. Here are some words
            from people who trusted Fatima Hospital with their healthcare.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition hover:-translate-y-2"
            >

              <div className="flex gap-1 mb-5">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <p className="text-gray-600 leading-8 italic">
                "{item.review}"
              </p>

              <div className="mt-8">

                <h3 className="font-bold text-xl text-gray-900">
                  {item.name}
                </h3>

                <p className="text-blue-600">
                  {item.treatment}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}