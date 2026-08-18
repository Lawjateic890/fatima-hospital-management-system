export default function WhyChooseUs() {
  const features = [
    {
      title: "Experienced Doctors",
      icon: "👨‍⚕️",
      description:
        "Our highly qualified doctors provide expert medical care across multiple specialties.",
    },
    {
      title: "24/7 Emergency",
      icon: "🚑",
      description:
        "Emergency services are available around the clock for immediate patient care.",
    },
    {
      title: "Modern Equipment",
      icon: "🏥",
      description:
        "We use advanced medical technology for accurate diagnosis and effective treatment.",
    },
    {
      title: "Patient-Centered Care",
      icon: "❤️",
      description:
        "Every tient receives compassionate, personalized care from our dedicated team.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center text-blue-700 mb-4">
          Why Choose Fatima Hospital?
        </h2>

        <p className="text-center text-gray-600 mb-14 text-lg">
          Trusted healthcare with experienced professionals and modern facilities.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-blue-700 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}