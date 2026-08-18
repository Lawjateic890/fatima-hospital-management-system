export default function Departments() {
  const departments = [
    {
      name: "Cardiology",
      icon: "❤️",
      description: "Heart care and cardiovascular treatments.",
    },
    {
      name: "Neurology",
      icon: "🧠",
      description: "Diagnosis and treatment of nervous system disorders.",
    },
    {
      name: "Orthopedics",
      icon: "🦴",
      description: "Bone, joint and muscle treatments.",
    },
    {
      name: "Pediatrics",
      icon: "👶",
      description: "Complete healthcare services for children.",
    },
    {
      name: "Gynecology",
      icon: "🤰",
      description: "Women's health and maternity care.",
    },
    {
      name: "Emergency",
      icon: "🚑",
      description: "24/7 emergency and trauma services.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-800">
            Our Departments
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Fatima Hospital offers specialized medical departments equipped
            with experienced doctors and modern healthcare facilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-8"
            >
              <div className="text-5xl mb-5">
                {dept.icon}
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {dept.name}
              </h3>

              <p className="text-gray-600">
                {dept.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}