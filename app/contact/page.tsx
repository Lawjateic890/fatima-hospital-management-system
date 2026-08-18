"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setResponseMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setResponseMessage("");

      const response = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("✅ Message sent successfully!");

        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setResponseMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setResponseMessage("Unable to connect to the server.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">
            Send Us a Message
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              name="message"
              rows={6}
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {responseMessage && (
              <p className="text-center font-medium mt-3">
                {responseMessage}
              </p>
            )}

          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-red-600 text-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-4">
            Medical Emergency?
          </h2>

          <p className="mb-6">
            Our emergency department operates 24 hours a day with experienced
            doctors, trained nurses, and ambulance services ready to respond.
          </p>

          <div className="space-y-4">

            <div>
              <h3 className="font-bold text-xl">
                📞 Emergency Hotline
              </h3>
              <p>+92 51 12345678</p>
            </div>

            <div>
              <h3 className="font-bold text-xl">
                📧 Email
              </h3>
              <p>fatimahospitalofficial.pk@gmail.com</p>
            </div>

            <div>
              <h3 className="font-bold text-xl">
                📍 Address
              </h3>
              <p>
                Fatima Hospital, Islamabad, Pakistan
              </p>
            </div>

            <div>
              <h3 className="font-bold text-xl">
                🕒 Working Hours
              </h3>
              <p>24/7 Emergency Services</p>
              <p>OPD: 9:00 AM – 8:00 PM</p>
            </div>

            <div className="mt-8">
              <ul className="space-y-2">
                <li>✅ ICU Available</li>
                <li>✅ Emergency Care</li>
                <li>✅ General OPD</li>
                <li>✅ Specialist Doctors</li>
              </ul>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}