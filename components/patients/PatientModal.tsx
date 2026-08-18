interface Patient {
  patient_id: number;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  blood_group: string;
  disease: string;
  date_of_birth: string;
}

interface PatientModalProps {
  patient: Patient | null;
  open: boolean;
  onClose: () => void;
}

export default function PatientModal({
  patient,
  open,
  onClose,
}: PatientModalProps) {
  if (!open || !patient) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 relative">

        <button
          onClick={onClose}
          className="absolute right-5 top-4 text-3xl text-gray-500 hover:text-red-600"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          👤 Patient Details
        </h2>

        <div className="space-y-4 text-gray-700">

          <p><strong>Name:</strong> {patient.full_name}</p>

          <p><strong>Email:</strong> {patient.email}</p>

          <p><strong>Phone:</strong> {patient.phone}</p>

          <p><strong>Gender:</strong> {patient.gender}</p>

          <p><strong>Blood Group:</strong> {patient.blood_group}</p>

          <p><strong>Disease:</strong> {patient.disease}</p>

          <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(patient.date_of_birth).toLocaleDateString()}
          </p>

        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          Close
        </button>

      </div>

    </div>
  );
}