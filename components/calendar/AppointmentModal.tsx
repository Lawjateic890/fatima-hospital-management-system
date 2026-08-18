"use client";

interface Appointment {
  appointment_id: number;
  patient_name: string;
  doctor_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

interface Props {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({
  appointment,
  isOpen,
  onClose,
}: Props) {
  if (!isOpen || !appointment) return null;

  const badgeColor =
    appointment.status === "Confirmed"
      ? "bg-green-100 text-green-700"
      : appointment.status === "Pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-[500px] p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">
            🏥 Appointment Details
          </h2>

          <button
            onClick={onClose}
            className="text-3xl hover:text-red-600"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="font-semibold">Appointment ID</span>
            <span>FH-{appointment.appointment_id}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Patient</span>
            <span>{appointment.patient_name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Doctor</span>
            <span>{appointment.doctor_name}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Date</span>
            <span>{appointment.appointment_date}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Time</span>
            <span>{appointment.appointment_time}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold">Status</span>

            <span className={`px-3 py-1 rounded-full font-semibold ${badgeColor}`}>
              {appointment.status}
            </span>
          </div>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Close
        </button>

      </div>

    </div>
  );
}