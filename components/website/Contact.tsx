import Navbar from "@/components/website/Navbar";
import Footer from "@/components/website/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  Ambulance,
  Send,
} from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50 min-h-screen">

        {/* Hero */}

        <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-24">

          <div className="max-w-7xl mx-auto px-6 text-center">

            <h1 className="text-5xl md:text-6xl font-bold">
              Contact Fatima Hospital
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-100">
              We are always here to assist you. Contact us for appointments,
              emergency services, medical information, or any healthcare
              inquiries.
            </p>

          </div>

        </section>

        {/* Contact Cards */}

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6">

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

                <Phone className="mx-auto text-blue-600" size={40} />

                <h3 className="text-xl font-bold mt-5 text-gray-800">
                  Phone
                </h3>

                <p className="mt-4 text-gray-600">
                  +92 51 12345678
                </p>

                <p className="text-gray-600">
                  +92 300 1234567
                </p>

              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

                <Mail className="mx-auto text-green-600" size={40} />

                <h3 className="text-xl font-bold mt-5 text-gray-800">
                  Email
                </h3>

                <p className="mt-4 text-gray-600">
                  info@fatimahospital.pk
                </p>

              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

                <MapPin className="mx-auto text-red-600" size={40} />

                <h3 className="text-xl font-bold mt-5 text-gray-800">
                  Address
                </h3>

                <p className="mt-4 text-gray-600">
                  Fatima Hospital
                </p>

                <p className="text-gray-600">
                  Pakistan
                </p>

              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

                <Clock3 className="mx-auto text-purple-600" size={40} />

                <h3 className="text-xl font-bold mt-5 text-gray-800">
                  Working Hours
                </h3>

                <p className="mt-4 text-gray-600">
                  Monday - Sunday
                </p>

                <p className="font-semibold text-blue-600">
                  24 / 7
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Form + Emergency */}

        <section className="pb-20">

          <div className="max-w-7xl mx-auto px-6">

            <div className="grid lg:grid-cols-2 gap-10">

              {/* Contact Form */}

              <div className="bg-white rounded-3xl shadow-lg p-10">

                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Send Us a Message
                </h2>

                <div className="space-y-5">

                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border rounded-xl p-4 text-black"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full border rounded-xl p-4 text-black"
                  />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full border rounded-xl p-4 text-black"
                  />

                  <textarea
                    rows={6}
                    placeholder="Write your message..."
                    className="w-full border rounded-xl p-4 text-black"
                  />

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-3">
                    <Send size={20} />
                    Send Message
                  </button>

                </div>

              </div>

              {/* Emergency */}

              <div className="bg-gradient-to-br from-red-600 to-orange-500 rounded-3xl text-white p-10">

                <Ambulance size={70} />

                <h2 className="text-4xl font-bold mt-8">
                  Medical Emergency?
                </h2>

                <p className="mt-6 text-red-100 leading-8">
                  Our emergency department operates 24 hours a day with
                  experienced doctors, trained nursing staff and ambulance
                  services ready to respond immediately.
                </p>

                <div className="mt-10">

                  <h3 className="text-3xl font-bold">
                    +92 51 12345678
                  </h3>

                  <p className="mt-2 text-red-100">
                    Emergency Hotline
                  </p>

                </div>

                <div className="mt-10 space-y-4">

                  <div>✅ 24/7 Emergency Care</div>
                  <div>✅ Ambulance Service</div>
                  <div>✅ Critical Care Unit</div>
                  <div>✅ ICU Available</div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Google Map */}

        <section className="pb-20">

          <div className="max-w-7xl mx-auto px-6">

            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              <iframe
                src="https://www.google.com/maps?q=Islamabad&output=embed"
                width="100%"
                height="500"
                loading="lazy"
              />

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}