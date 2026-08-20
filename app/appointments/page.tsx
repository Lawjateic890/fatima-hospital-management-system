"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";

interface Doctor {
  doctor_id: number;
  full_name: string;
  specialization: string;
  email?: string;
  phone?: string;
  department_id: number;
}

interface Department {
  department_id: number;
  name: string;
}

interface FormData {
  patientName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  symptoms: string;
}

export default function AppointmentsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    department: "",
    doctor: "",
    date: "",
    time: "",
    symptoms: "",
  });

  // =========================================================
  // LOAD DEPARTMENTS
  // =========================================================

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch(
          "https://fatima-hospital-backend-production.up.railway.app/departments"
        );

        if (!response.ok) {
          throw new Error("Failed to load departments");
        }

        const data = await response.json();

        console.log("Departments:", data);

        const formatted = data.map((department: any) => ({
          department_id:
            department.department_id ??
            department.id,

          name:
            department.name ??
            department.department_name ??
            department.full_name,
        }));

        setDepartments(formatted);
      } catch (error) {
        console.error(
          "Error loading departments:",
          error
        );
      } finally {
        setLoadingDepartments(false);
      }
    }

    fetchDepartments();
  }, []);

  // =========================================================
  // LOAD DOCTORS
  // =========================================================

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch(
          "https://fatima-hospital-backend-production.up.railway.app/doctors"
        );

        if (!response.ok) {
          throw new Error("Failed to load doctors");
        }

        const data = await response.json();

        console.log("Doctors:", data);

        const formatted = data.map((doctor: any) => ({
          doctor_id:
            doctor.doctor_id ??
            doctor.id,

          full_name:
            doctor.full_name ??
            doctor.name,

          specialization:
            doctor.specialization,

          email:
            doctor.email,

          phone:
            doctor.phone,

          department_id:
            Number(
              doctor.department_id
            ),
        }));

        setDoctors(formatted);
      } catch (error) {
        console.error(
          "Error loading doctors:",
          error
        );
      } finally {
        setLoadingDoctors(false);
      }
    }

    fetchDoctors();
  }, []);

  // =========================================================
  // FILTER DOCTORS BY DEPARTMENT
  // =========================================================

  const filteredDoctors = useMemo(() => {
    if (!formData.department) {
      return [];
    }

    return doctors.filter(
      (doctor) =>
        doctor.department_id ===
        Number(formData.department)
    );
  }, [
    doctors,
    formData.department,
  ]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,

      ...(name === "department"
        ? {
            doctor: "",
          }
        : {}),
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    const newErrors: Record<
      string,
      string
    > = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName =
        "Patient name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required.";
    } else if (
      !/\S+@\S+\.\S+/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required.";
    }

    if (!formData.age) {
      newErrors.age =
        "Age is required.";
    }

    if (!formData.gender) {
      newErrors.gender =
        "Gender is required.";
    }

    if (!formData.department) {
      newErrors.department =
        "Department is required.";
    }

    if (!formData.doctor) {
      newErrors.doctor =
        "Doctor is required.";
    }

    if (!formData.date) {
      newErrors.date =
        "Appointment date is required.";
    }

    if (!formData.time) {
      newErrors.time =
        "Appointment time is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =========================================================
  // BOOK APPOINTMENT
  // =========================================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://fatima-hospital-backend-production.up.railway.app/appointments",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            patient_name:
              formData.patientName,

            email:
              formData.email,

            phone:
              formData.phone,

            age:
              Number(formData.age),

            gender:
              formData.gender,

            doctor_id:
              Number(formData.doctor),

            appointment_date:
              formData.date,

            appointment_time:
              formData.time,

            status:
              "Pending",

            symptoms:
              formData.symptoms,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to book appointment."
        );
      }

      // Use the REAL database appointment ID
      const realAppointmentId =
        data.appointment_id;

      setAppointmentId(
        `FH-${String(
          realAppointmentId
        ).padStart(6, "0")}`
      );

      setShowModal(true);

      // Reset form
      setFormData({
        patientName: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        department: "",
        doctor: "",
        date: "",
        time: "",
        symptoms: "",
      });

      setErrors({});
    } catch (error: any) {
      console.error(error);

      alert(
        error.message ||
          "Server error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // TODAY
  // =========================================================

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <>
      

      <main className="min-h-screen bg-slate-50">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white">

          <div className="mx-auto max-w-[1400px] px-6 py-20 lg:py-28">

            <div className="grid items-center gap-12 lg:grid-cols-2">

              {/* LEFT */}

              <div>

                <span className="inline-block rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
                  🏥 Fatima Hospital
                </span>

                <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-6xl">
                  Book Your
                  <span className="block text-cyan-200">
                    Medical Appointment
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
                  Book appointments with highly
                  qualified doctors at Fatima
                  Hospital. Fast, secure and
                  convenient healthcare for you
                  and your family.
                </p>

                <div className="mt-12 grid grid-cols-2 gap-6">

                  <div className="rounded-2xl bg-white p-6 text-gray-900 shadow-xl">

                    <h2 className="text-4xl font-bold text-blue-600">
                      25+
                    </h2>

                    <p className="mt-2">
                      Specialist Doctors
                    </p>

                  </div>

                  <div className="rounded-2xl bg-white p-6 text-gray-900 shadow-xl">

                    <h2 className="text-4xl font-bold text-green-600">
                      24/7
                    </h2>

                    <p className="mt-2">
                      Emergency Service
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              <div className="rounded-3xl border border-gray-200 bg-white p-8 text-gray-900 shadow-2xl">

                <h2 className="text-3xl font-bold">
                  Appointment Form
                </h2>

                <p className="mt-2 text-gray-500">
                  Fill in your details below.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-5"
                >

                  {/* NAME + EMAIL */}

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Patient Name
                      </label>

                      <input
                        type="text"
                        name="patientName"
                        value={
                          formData.patientName
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Full name"
                        className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.patientName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      {errors.patientName && (
                        <p className="mt-1 text-sm text-red-500">
                          {
                            errors.patientName
                          }
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={
                          formData.email
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="example@email.com"
                        className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.email
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* PHONE AGE GENDER */}

                  <div className="grid gap-5 md:grid-cols-3">

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Phone
                      </label>

                      <input
                        type="text"
                        name="phone"
                        value={
                          formData.phone
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="03XXXXXXXXX"
                        className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.phone
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Age
                      </label>

                      <input
                        type="number"
                        min="0"
                        max="120"
                        name="age"
                        value={
                          formData.age
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Age"
                        className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.age
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      {errors.age && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.age}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Gender
                      </label>

                      <select
                        name="gender"
                        value={
                          formData.gender
                        }
                        onChange={
                          handleChange
                        }
                        className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">
                          Select Gender
                        </option>

                        <option value="Male">
                          Male
                        </option>

                        <option value="Female">
                          Female
                        </option>

                        <option value="Other">
                          Other
                        </option>
                      </select>

                      {errors.gender && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.gender}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* DEPARTMENT + DOCTOR */}

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Department
                      </label>

                      <select
                        name="department"
                        value={
                          formData.department
                        }
                        onChange={
                          handleChange
                        }
                        disabled={
                          loadingDepartments
                        }
                        className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      >

                        <option value="">
                          {loadingDepartments
                            ? "Loading Departments..."
                            : "Select Department"}
                        </option>

                        {departments.map(
                          (department) => (
                            <option
                              key={
                                department.department_id
                              }
                              value={
                                department.department_id
                              }
                            >
                              {department.name}
                            </option>
                          )
                        )}

                      </select>

                      {errors.department && (
                        <p className="mt-1 text-sm text-red-500">
                          {
                            errors.department
                          }
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Doctor
                      </label>

                      <select
                        name="doctor"
                        value={
                          formData.doctor
                        }
                        onChange={
                          handleChange
                        }
                        disabled={
                          !formData.department ||
                          loadingDoctors
                        }
                        className="h-12 w-full rounded-xl border border-gray-300 bg-white px-4 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500"
                      >

                        <option value="">
                          {!formData.department
                            ? "Select Department First"
                            : loadingDoctors
                            ? "Loading Doctors..."
                            : "Select Doctor"}
                        </option>

                        {filteredDoctors.map(
                          (doctor) => (
                            <option
                              key={
                                doctor.doctor_id
                              }
                              value={
                                doctor.doctor_id
                              }
                            >
                              {doctor.full_name}{" "}
                              -{" "}
                              {
                                doctor.specialization
                              }
                            </option>
                          )
                        )}

                      </select>

                      {errors.doctor && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.doctor}
                        </p>
                      )}

                      {formData.department &&
                        !loadingDoctors &&
                        filteredDoctors.length ===
                          0 && (
                          <p className="mt-1 text-sm text-orange-500">
                            No doctors found in
                            this department.
                          </p>
                        )}
                    </div>

                  </div>

                  {/* DATE + TIME */}

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Appointment Date
                      </label>

                      <input
                        type="date"
                        name="date"
                        value={
                          formData.date
                        }
                        onChange={
                          handleChange
                        }
                        min={today}
                        className={`h-12 w-full rounded-xl border bg-white px-4 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.date
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      {errors.date && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Appointment Time
                      </label>

                      <input
                        type="time"
                        name="time"
                        value={
                          formData.time
                        }
                        onChange={
                          handleChange
                        }
                        className={`h-12 w-full rounded-xl border bg-white px-4 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.time
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      {errors.time && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.time}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* SYMPTOMS */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Symptoms / Notes
                    </label>

                    <textarea
                      rows={4}
                      name="symptoms"
                      value={
                        formData.symptoms
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Describe your symptoms..."
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-blue-600 py-4 text-lg font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Booking Appointment..."
                      : "Book Appointment"}
                  </button>

                </form>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            SUCCESS MODAL
        ================================================= */}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">

            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

              <div className="text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                  ✓
                </div>

                <h2 className="mt-5 text-3xl font-bold text-green-600">
                  Appointment Booked!
                </h2>

                <p className="mt-3 text-gray-600">
                  Your appointment has been
                  successfully submitted.
                </p>

              </div>

              <div className="mt-6 rounded-2xl bg-blue-50 p-5">

                <p className="text-center text-sm text-gray-500">
                  Your Appointment ID
                </p>

                <h3 className="mt-1 text-center text-3xl font-extrabold text-blue-600">
                  {appointmentId}
                </h3>

              </div>

              <p className="mt-5 text-center text-sm text-gray-500">
                Please keep this appointment
                ID for your records.
              </p>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Done
              </button>

            </div>

          </div>
        )}

      </main>
    </>
  );
}