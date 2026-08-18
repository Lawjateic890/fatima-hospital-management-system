export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">

        <div>
          <h2 className="text-3xl font-bold text-blue-400">
            Fatima Hospital
          </h2>

          <p className="mt-4 text-gray-300 leading-7">
            Providing trusted healthcare with experienced doctors,
            modern technology, and compassionate patient care for
            every patient.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300">
            <li><a href="/">Home</a></li>
            <li><a href="/departments">Departments</a></li>
            <li><a href="/doctors">Doctors</a></li>
            <li><a href="/appointments">Appointments</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact Us
          </h3>

          <p className="text-gray-300">
            📍 ServiceRoad,East Near Koral Chowk Interchange,Main ExpressWay Islamabad
          </p>

          <p className="mt-2 text-gray-300">
            📞 +92 332-5906961,051-6040334
          </p>

          <p className="mt-2 text-gray-300">
            ✉ fatimahospitalofficial.pk@gmail.com
          </p>
        </div>

      </div>

      <div className="border-t border-slate-700 py-5 text-center text-gray-400">
        © 2026 Fatima Hospital. All Rights Reserved.
      </div>
    </footer>
  );
}