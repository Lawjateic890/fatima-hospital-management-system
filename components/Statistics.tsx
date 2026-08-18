export default function Statistics() {
  const stats = [
    {
      number: "15+",
      title: "Departments",
    },
    {
      number: "25+",
      title: "Expert Doctors",
    },
    {
      number: "5,000+",
      title: "Happy Patients",
    },
    {
      number: "24/7",
      title: "Emergency Care",
    },
  ];

  return (
    <section className="bg-blue-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-5xl font-bold text-center mb-16">
          Our Hospital in Numbers
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="text-center bg-blue-600 rounded-2xl p-10 hover:bg-blue-500 transition"
            >
              <h3 className="text-5xl font-extrabold mb-3">
                {stat.number}
              </h3>

              <p className="text-xl text-blue-100">
                {stat.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}