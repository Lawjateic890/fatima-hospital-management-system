
import WhyChooseUs from "@/components/website/WhyChooseUs";
import Statistics from "@/components/website/Statistics";

export default function AboutPage() {
  return (
    <>
    

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">
            About Fatima Hospital
          </h1>

          <p className="mt-6 text-xl max-w-3xl mx-auto">
            Providing compassionate, modern, and patient-centered healthcare
            since 2022.
          </p>
        </div>
      </section>

      {/* Hospital Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl font-bold text-blue-700 mb-6">
              Our Story
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              Fatima Hospital was established in 2022 with a vision of
              delivering quality healthcare through experienced medical
              professionals, advanced technology, and compassionate patient
              care.
            </p>

            <p className="text-gray-600 leading-8">
              Under the leadership of Chairman <strong>Wajahat Nazeer</strong>,
              Fatima Hospital has continued to grow while maintaining its
              commitment to excellence, integrity, and community service.
            </p>
          </div>

          <div className="bg-blue-50 rounded-3xl p-10 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-700 mb-6">
              Hospital Information
            </h3>

            <div className="space-y-4 text-lg">
              <p><strong>Founded:</strong> 2022</p>
              <p><strong>Chairman:</strong> Wajahat Nazeer</p>
              <p><strong>Emergency:</strong> 24/7</p>
              <p><strong>Departments:</strong> 15+</p>
              <p><strong>Doctors:</strong> 20+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-700 mb-5">
              Our Mission
            </h2>

            <p className="text-gray-600 leading-8">
              To provide accessible, affordable, and high-quality healthcare
              through skilled professionals, advanced medical technology, and
              compassionate patient care.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-700 mb-5">
              Our Vision
            </h2>

            <p className="text-gray-600 leading-8">
              To become one of the most trusted healthcare institutions,
              recognized for excellence in medical services, innovation, and
              patient satisfaction.
            </p>
          </div>

        </div>
      </section>

      {/* Existing Components */}
      <WhyChooseUs />

      <Statistics />

      {/* Chairman */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-blue-700">
            Message from the Chairman
          </h2>

          <p className="mt-8 text-gray-600 leading-8 text-lg">
            "Our mission is to ensure that every patient receives quality,
            compassionate, and affordable healthcare. Since our establishment in
            2022, we have remained committed to excellence while continuously
            improving our facilities and medical services for our community."
          </p>

          <div className="mt-10">
            <h3 className="text-2xl font-bold">
              Wajahat Nazeer
            </h3>

            <p className="text-blue-600">
              Chairman, Fatima Hospital
            </p>
          </div>

        </div>
      </section>

      

      
    </>
  );
}