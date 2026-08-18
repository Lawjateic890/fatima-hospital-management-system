export default function Services() {
  const services = [
    {
      icon: "❤️",
      name: "Cardiology",
      description:
        "Advanced heart care with experienced cardiologists and modern equipment.",
    },
    {
      icon: "🧠",
      name: "Neurology",
      description:
        "Specialized treatment for brain and nervous system conditions.",
    },
    {
      icon: "🦴",
      name: "Orthopedics",
      description:
        "Complete bone and joint care with expert orthopedic surgeons.",
    },
    {
      icon: "👶",
      name: "Pediatrics",
      description:
        "Quality healthcare services specially designed for children.",
    },
    {
      icon: "🚑",
      name: "Emergency Care",
      description:
        "24/7 emergency services for urgent medical situations.",
    },
    {
      icon: "🔬",
      name: "Radiology",
      description:
        "Advanced imaging and diagnostic services for accurate treatment.",
    },
    {
      icon: "🤰",
      name: "Gynaecology",
      description:
        "Specialized care for women's health and reproductive issues.",
    },
  ];

  return (
    <section className="bg-blue-50 py-20">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center text-blue-700 mb-5">
          Our Medical Services
        </h2>

        <p className="text-center text-gray-600 text-lg mb-14">
          Providing specialized healthcare services with modern facilities.
        </p>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {services.map((service) => (
            <div
              key={service.name}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition"
            >

              <div className="text-5xl mb-5">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-blue-700 mb-3">
                {service.name}
              </h3>

              <p className="text-gray-600 leading-7">
                {service.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}