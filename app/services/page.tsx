
import Link from "next/link";
import Hero from "@/components/website/Hero";

export default function ServicesPage() {
  const services = [
    {
      icon: "🚑",
      title: "Emergency Care",
      description:
        "24/7 emergency medical services with experienced doctors and rapid response.",
    },
    {
      icon: "🩺",
      title: "General Checkup",
      description:
        "Routine health examinations and preventive healthcare for all ages.",
    },
    {
      icon: "🧪",
      title: "Laboratory",
      description:
        "Accurate diagnostic laboratory tests using modern equipment.",
    },
    {
      icon: "💊",
      title: "Pharmacy",
      description:
        "Fully stocked pharmacy providing genuine medicines and expert guidance.",
    },
    {
      icon: "🏥",
      title: "ICU",
      description:
        "Advanced intensive care unit with 24-hour monitoring and specialists.",
    },
    {
      icon: "🩻",
      title: "Radiology",
      description:
        "Digital X-Ray, CT Scan, MRI and ultrasound diagnostic services.",
    },
   
    {
      icon: "⚕️",
      title: "Surgery",
      description:
        "Safe and modern surgical procedures performed by experienced surgeons.",
    },
  ];

  return (
    <>
      
      <Hero />
      <main className="min-h-screen bg-slate-50">

        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">

            <h1 className="text-5xl font-bold">
              Our Medical Services
            </h1>

            <p className="mt-5 text-lg max-w-3xl mx-auto">
              Fatima Hospital offers high-quality healthcare services using
              modern technology and experienced medical professionals.
            </p>

          </div>
        </section>

        {/* Services */}
        <section className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >
                <div className="text-6xl mb-5">
                  {service.icon}
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {service.title}
                </h2>

                <p className="text-gray-600 mt-4">
                  {service.description}
                </p>

                <Link
  href="/appointments"
  className="mt-6 block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center transition"
>
  Book Appointment
</Link>
                
              </div>
            ))}

          </div>

        </section>

      </main>
    </>
  );
}