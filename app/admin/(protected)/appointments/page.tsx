"use client";

import { useEffect, useMemo, useState } from "react";

interface Appointment {
  appointment_id: number;
  patient_id: number;
  doctor_id: number;

  patient_name: string;
  doctor_name: string;
  specialization: string;

  appointment_date: string;
  appointment_time: string;

  status: string;
  symptoms?: string;
  created_at: string;
}
interface Patient {
  patient_id: number;
  full_name: string;
}

interface Doctor {
  doctor_id: number;
  full_name: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);

  const [editingAppointmentId, setEditingAppointmentId] =
    useState<number | null>(null);
    const [selectedAppointment, setSelectedAppointment] =
  useState<Appointment | null>(null);

  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [symptoms, setSymptoms] = useState("");


  const [status, setStatus] = useState("Pending");
  
 
  // LOAD DATA
  // -----------------------------

  const loadAppointments = async () => {
    try {
      const res = await fetch("http://localhost:5000/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadPatients = async () => {
    try {
      const res = await fetch("http://localhost:5000/patients");
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadDoctors = async () => {
    try {
      const res = await fetch("http://localhost:5000/doctors");
      const data = await res.json();
      setDoctors(data);
      console.log(doctors);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAppointments();
    loadPatients();
    loadDoctors();
  }, []);

  // -----------------------------
  // SEARCH
  // -----------------------------

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {

      const value = search.toLowerCase();

      return (
        appointment.patient_name
          .toLowerCase()
          .includes(value) ||

        appointment.doctor_name
          .toLowerCase()
          .includes(value) ||

        appointment.status
          .toLowerCase()
          .includes(value)
      );

    });
  }, [appointments, search]);

  // -----------------------------
  // ADD APPOINTMENT
  // -----------------------------

  const addAppointment = async () => {

    if (
      !patientId ||
      !doctorId ||
      !date ||
      !time
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/appointments",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            patient_id: Number(patientId),

            doctor_id: Number(doctorId),

            appointment_date: date,

            appointment_time: time,

            status,

            symptoms,

          }),
        }
      );

      if (!response.ok) {

        const error = await response.json();

        alert(error.message);

        return;
      }

      alert("Appointment booked successfully!");

      setPatientId("");
      setDoctorId("");
      setDate("");
      setTime("");
      setStatus("Pending");

      setShowModal(false);

      loadAppointments();

    } catch (err) {

      console.error(err);

      alert("Server Error");
    }

  };

  // -----------------------------
  // DELETE APPOINTMENT
  // -----------------------------

  const deleteAppointment = async (
    id: number
  ) => {

    const confirmDelete = confirm(
      "Delete this appointment?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `http://localhost:5000/appointments/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {

        const error = await response.json();

        alert(error.message);

        return;
      }

      alert("Appointment deleted successfully!");

      loadAppointments();

    } catch (err) {

      console.error(err);

      alert("Server Error");

    }

  };

  // -----------------------------
  // STATUS BADGE
  // -----------------------------

  const badgeColor = (status: string) => {

    switch (status) {

      case "Confirmed":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const updateAppointment = async () => {
  if (editingAppointmentId === null) return;

  try {
    const response = await fetch(
      `http://localhost:5000/appointments/${editingAppointmentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient_id: Number(patientId),
          doctor_id: Number(doctorId),
          appointment_date: date,
          appointment_time: time,
          status,
          symptoms,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      alert(error.message);
      return;
    }

    alert("Appointment updated successfully!");

    setEditingAppointmentId(null);

    setPatientId("");
    setDoctorId("");
    setDate("");
    setTime("");
    setStatus("Pending");
    setSymptoms("");
    setShowModal(false);

    loadAppointments();

  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
};
  return (
  
  <div className="min-h-screen bg-slate-100 p-8">

  {/* Header */}

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">

    <div>

      <h1 className="text-4xl font-bold text-blue-700">
        Appointment Management
      </h1>

      <p className="text-gray-600 mt-2">
        Manage all hospital appointments from one place.
      </p>

    </div>

    <button
      onClick={() => setShowModal(true)}
      className="mt-5 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
    >
      + New Appointment
    </button>

  </div>

  {/* Statistics */}

  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

    <div className="bg-white rounded-xl shadow-lg p-6">

      <p className="text-gray-500">
        Total Appointments
      </p>

      <h2 className="text-4xl font-bold text-blue-700 mt-2">
        {appointments.length}
      </h2>

    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">

      <p className="text-gray-500">
        Pending
      </p>

      <h2 className="text-4xl font-bold text-yellow-600 mt-2">

        {
          appointments.filter(
            (a) => a.status === "Pending"
          ).length
        }

      </h2>

    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">

      <p className="text-gray-500">
        Confirmed
      </p>

      <h2 className="text-4xl font-bold text-green-600 mt-2">

        {
          appointments.filter(
            (a) => a.status === "Confirmed"
          ).length
        }

      </h2>

    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">

      <p className="text-gray-500">
        Cancelled
      </p>

      <h2 className="text-4xl font-bold text-red-600 mt-2">

        {
          appointments.filter(
            (a) => a.status === "Cancelled"
          ).length
        }

      </h2>

    </div>

  </div>

  {/* Search */}

  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

    <input
      type="text"
      placeholder="Search by patient, doctor or status..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 outline-none"
    />

  </div>
  {/* Appointment Cards */}

<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  {filteredAppointments.map((appointment) => (

    <div
      key={appointment.appointment_id}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6"
    >

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-black">
            {appointment.patient_name}
          </h2>

          <p className="text-blue-600 font-semibold mt-1">
            {appointment.doctor_name}
          </p>

          <p className="text-gray-500">
            {appointment.specialization}
          </p>

          <div className="mt-4 space-y-1">

            <p className="text-gray-700">
  📅{" "}
  {appointment.appointment_date
    ? appointment.appointment_date
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/")
    : "No date available"}
</p>

            <p className="text-gray-700">
  🕐{" "}
  {appointment.appointment_time
    ? appointment.appointment_time.slice(0, 5)
    : "No time available"}
</p>

          </div>
          {appointment.symptoms && (
  <p className="text-gray-600 mt-4">
    <strong>Symptoms:</strong> {appointment.symptoms}
  </p>
)}

        </div>

        <div className="flex flex-col items-end gap-3">

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor(
              appointment.status
            )}`}
          >
            {appointment.status}
          </span>

          <div className="flex gap-2">

           <button
 onClick={() => {
  setEditingAppointmentId(appointment.appointment_id);

  setPatientId(String(appointment.patient_id));
  setDoctorId(String(appointment.doctor_id));

  setDate(
    appointment.appointment_date
      ? appointment.appointment_date.slice(0, 10)
      : ""
  );

  setTime(appointment.appointment_time.slice(0, 5));
  setStatus(appointment.status);

  setIsViewMode(false);
  setShowModal(true);
}}
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
>
  👁 View
</button>

<button
  onClick={() => {
  setSelectedAppointment(appointment);

  setPatientId(String(appointment.patient_id));
  setDoctorId(String(appointment.doctor_id));
 setDate(
  appointment.appointment_date
    ? appointment.appointment_date.slice(0, 10)
    : ""
);
  setTime(appointment.appointment_time);
  setStatus(appointment.status);

 setIsViewMode(false);
setEditingAppointmentId(appointment.appointment_id);
  setShowModal(true);
}}
  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
>
  ✏ Edit
</button>

<button
  onClick={() =>
    deleteAppointment(appointment.appointment_id)
  }
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
>
  🗑 Delete
</button>

          </div>

        </div>

      </div>

    </div>

  ))}

</div>

{filteredAppointments.length === 0 && (

  <div className="bg-white rounded-xl shadow-lg p-10 text-center mt-10">

    <h2 className="text-2xl font-bold text-gray-700">
      No Appointments Found
    </h2>

    <p className="text-gray-500 mt-2">
      Try another search.
    </p>

  </div>

)}

{/* Appointment Modal */}

{showModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">

      {/* TITLE */}

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        {isViewMode
          ? "Appointment Details"
          : editingAppointmentId === null
          ? "Book Appointment"
          : "Edit Appointment"}
      </h2>

      <div className="space-y-4">

        {/* PATIENT */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Patient
          </label>

          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            disabled={isViewMode}
            className="w-full border rounded-lg p-3 text-black disabled:bg-gray-100 disabled:text-gray-600"
          >
            <option value="">Select Patient</option>

            {patients.map((patient) => (
              <option
                key={patient.patient_id}
                value={patient.patient_id}
              >
                {patient.full_name}
              </option>
            ))}
          </select>
        </div>

        {/* DOCTOR */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Doctor
          </label>

          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            disabled={isViewMode}
            className="w-full border rounded-lg p-3 text-black disabled:bg-gray-100 disabled:text-gray-600"
          >
            <option value="">Select Doctor</option>

            {doctors.map((doctor) => (
              <option
                key={doctor.doctor_id}
                value={doctor.doctor_id}
              >
                {doctor.full_name}
              </option>
            ))}
          </select>
        </div>

        {/* DATE */}

        

  <div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    Appointment Date
  </label>

  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    disabled={isViewMode}
    className="w-full border rounded-lg p-3 text-black disabled:bg-gray-100 disabled:text-gray-600"
  />
</div>
</div>

        {/* TIME */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Appointment Time
          </label>

          <input
  type="time"
  value={time.slice(0,5)}
  onChange={(e) => setTime(e.target.value)}
  disabled={isViewMode}
  className="w-full border rounded-lg p-3 text-black disabled:bg-gray-100 disabled:text-gray-600"
/>

        {/* STATUS */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Status
          </label>

          <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  disabled={isViewMode}
  className="w-full border rounded-lg p-3 text-black disabled:bg-gray-100 disabled:text-gray-600"
>
            <option>Pending</option>
            <option>Confirmed</option>
            <option>Cancelled</option>
            <option>Completed</option>
          </select>
        </div>

        {/* SYMPTOMS */}

        <div>
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    Symptoms / Notes
  </label>

  <textarea
    rows={3}
    value={symptoms}
    onChange={(e) => setSymptoms(e.target.value)}
    disabled={isViewMode}
    className="w-full border rounded-lg p-3 text-black disabled:bg-gray-100 disabled:text-gray-600"
    placeholder="Enter symptoms..."
  />
</div>

      </div>

      {/* BUTTONS */}

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={() => {
            setShowModal(false);
            setIsViewMode(false);
            setSelectedAppointment(null);
            setEditingAppointmentId(null);

            setPatientId("");
            setDoctorId("");
            setDate("");
            setTime("");
            setStatus("Pending");
          }}
          className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black"
        >
          {isViewMode ? "Close" : "Cancel"}
        </button>

        {!isViewMode && (
          <button
            onClick={() => {
              if (editingAppointmentId === null) {
                addAppointment();
              } else {
                updateAppointment();
              }
            }}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            {editingAppointmentId === null
              ? "Book Appointment"
              : "Update Appointment"}
          </button>
        )}

      </div>

    </div>

  </div>
)}

</div>
);
}