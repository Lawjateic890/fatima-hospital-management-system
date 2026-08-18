
import Link from "next/link";
export default function DepartmentsPage() {
  const departments = [
    {
      name: "Cardiology",
      icon: "❤️",
      description: "Heart and cardiovascular care with experienced specialists.",
      doctors: 12,
    },
    {
      name: "Neurology",
      icon: "🧠",
      description: "Advanced diagnosis and treatment of brain disorders.",
      doctors: 8,
    },
    {
      name: "Orthopedics",
      icon: "🦴",
      description: "Bone, joint and muscle care for all age groups.",
      doctors: 10,
    },
    {
      name: "Pediatrics",
      icon: "👶",
      description: "Comprehensive healthcare services for children.",
      doctors: 9,
    },
    {
      name: "Gynecology",
      icon: "🌸",
      description: "Complete women's healthcare and maternity services.",
      doctors: 7,
    },
    {
      name: "ENT",
      icon: "👂",
      description: "Expert treatment for ear, nose and throat conditions.",
      doctors: 6,
    },
    {
      name: "Dermatology",
      icon: "✨",
      description: "Skin, hair and nail treatments using modern technology.",
      doctors: 5,
    },
    {
      name: "Radiology",
      icon: "🩻",
      description: "Digital X-ray, MRI, CT Scan and ultrasound services.",
      doctors: 4,
    },
  ];

  return (
  <>
   

    <main className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-blue-700">
            Our Departments
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            Fatima Hospital provides high-quality healthcare through
            specialized departments equipped with modern technology and
            experienced medical professionals.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((dept, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="text-6xl mb-5">{dept.icon}</div>

              <h2 className="text-2xl font-bold text-gray-800">
                {dept.name}
              </h2>

              <p className="text-gray-500 mt-3">
                {dept.description}
              </p>

              <div className="mt-6 text-blue-600 font-semibold">
                {dept.doctors} Specialist Doctors
              </div>

              <Link href="/doctors">
  <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition">
    Learn More
  </button>
</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}