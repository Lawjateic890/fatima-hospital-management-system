"use client";

import { useState, useEffect } from "react";

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (doctor: {
    full_name: string;
    specialization: string;
    email: string;
    phone: string;
    department_id: number;
    image: string;
  }) => void;
  doctor?: any;
}

export default function DoctorModal({
  isOpen,
  onClose,
  onSave,
  doctor,
}: DoctorModalProps) {
  const [fullName, setFullName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    if (doctor) {
      setFullName(doctor.full_name || "");
      setSpecialization(doctor.specialization || "");
      setEmail(doctor.email || "");
      setPhone(doctor.phone || "");
      setDepartmentId(String(doctor.department_id || ""));
      setImage(doctor.image || "");
    } else {
      setFullName("");
      setSpecialization("");
      setEmail("");
      setPhone("");
      setDepartmentId("");
      setImage("");
    }
  }, [doctor, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl">

        <div className="bg-blue-600 text-white p-6 rounded-t-3xl">
          <h2 className="text-3xl font-bold">
            {doctor ? "Edit Doctor" : "Add Doctor"}
          </h2>

          <p className="text-blue-100 mt-1">
            {doctor
              ? "Update doctor's information"
              : "Enter doctor's information"}
          </p>
        </div>

        <div className="p-8">

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
            />

            <input
              type="text"
              placeholder="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
            />

            <input
              type="number"
              placeholder="Department ID"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
            />

            <input
              type="text"
              placeholder="Image URL (Optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500"
            />

          </div>

          <div className="flex gap-4 mt-8">

            <button
              onClick={onClose}
              className="w-1/2 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold"
            >
              Cancel
            </button>

            <button
              onClick={() =>
                onSave({
                  full_name: fullName,
                  specialization,
                  email,
                  phone,
                  department_id: parseInt(departmentId),
                  image,
                })
              }
              className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
            >
              {doctor ? "Update Doctor" : "Save Doctor"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}