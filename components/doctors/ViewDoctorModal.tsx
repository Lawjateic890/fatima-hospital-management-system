interface Doctor {
  doctor_id: number;
  full_name: string;
  specialization: string;
  email?: string;
  phone?: string;
  department_id?: number;
  image?: string;
}

interface ViewDoctorModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ViewDoctorModal({
  doctor,
  isOpen,
  onClose,
}: ViewDoctorModalProps) {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">

        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <h2 className="text-3xl font-bold">
            Doctor Profile
          </h2>

          <p className="text-blue-100 mt-1">
            Fatima Hospital
          </p>
        </div>

        {/* Body */}
        <div className="p-8">

          <div className="flex flex-col items-center">

            {doctor.image ? (
              <img
                src={doctor.image}
                alt={doctor.full_name}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-5xl font-bold text-blue-700 border-4 border-blue-200">
                {doctor.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}

            <h3 className="text-3xl font-bold text-gray-900 mt-5">
              {doctor.full_name}
            </h3>

            <p className="text-lg text-blue-600 font-semibold mt-2">
              {doctor.specialization}
            </p>

          </div>

          <div className="mt-10 space-y-5">

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">
                Doctor ID
              </span>

              <span className="text-gray-900">
                {doctor.doctor_id}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">
                Email
              </span>

              <span className="text-gray-900">
                {doctor.email || "N/A"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">
                Phone
              </span>

              <span className="text-gray-900">
                {doctor.phone || "N/A"}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold text-gray-700">
                Department ID
              </span>

              <span className="text-gray-900">
                {doctor.department_id ?? "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold text-gray-700">
                Specialization
              </span>

              <span className="text-gray-900">
                {doctor.specialization}
              </span>
            </div>

          </div>

          <button
            onClick={onClose}
            className="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}