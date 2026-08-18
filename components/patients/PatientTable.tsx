import { useState } from "react";

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

interface PatientTableProps {
  patients: Patient[];
  search: string;
  gender: string;
bloodGroup: string;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (id: number) => void;
}

export default function PatientTable({
  patients,
  search,
  gender,
  bloodGroup,
  onView,
  onEdit,
  onDelete,
}: PatientTableProps) {

  const filteredPatients = patients.filter((patient) => {
  const matchesSearch =
    patient.full_name.toLowerCase().includes(search.toLowerCase());

  const matchesGender =
    !gender || patient.gender === gender;

  const matchesBloodGroup =
    !bloodGroup || patient.blood_group === bloodGroup;

  return matchesSearch && matchesGender && matchesBloodGroup;
});

const [currentPage, setCurrentPage] = useState(1);

const patientsPerPage = 10;

const totalPages = Math.ceil(
  filteredPatients.length / patientsPerPage
);

const startIndex = (currentPage - 1) * patientsPerPage;

const currentPatients = filteredPatients.slice(
  startIndex,
  startIndex + patientsPerPage
);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        All Patients
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead className="sticky top-0 z-10">

            <tr className="bg-blue-600 text-white">

              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Disease</th>
              <th className="p-3 text-left">Blood Group</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Date of Birth</th>
              <th className="p-3 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredPatients.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-500"
                >
                  No patients found.
                </td>

              </tr>

            ) : (

              currentPatients.map((patient) => (

                <tr
  key={patient.patient_id}
  className="border-b even:bg-gray-50 hover:bg-blue-50 transition-colors"
>

                  <td className="p-3">
  <div className="flex items-center gap-3">

    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
      {patient.full_name.charAt(0).toUpperCase()}
    </div>

    <div>
      <p className="font-semibold text-gray-900">
        {patient.full_name}
      </p>

      <p className="text-xs text-gray-500">
        Patient ID: {patient.patient_id}
      </p>
    </div>

  </div>
</td>

                  <td className="p-3 text-black">
                    {patient.disease}
                  </td>

                  <td className="p-3">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {patient.blood_group}
                    </span>
                  </td>

                  <td className="p-3 text-black">
                    {patient.phone}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        patient.gender === "Male"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {patient.gender}
                    </span>

                  </td>

                  <td className="p-3 text-black">
                    {new Date(
                      patient.date_of_birth
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-3">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => onView(patient)}
                       className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                      >
                        👁 View
                      </button>

                      <button
                        onClick={() => onEdit(patient)}
                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() =>
                          onDelete(patient.patient_id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                      >
                        🗑 Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">

        <button
          onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          ← Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((page) =>
              Math.min(page + 1, totalPages)
            )
          }
          disabled={
            currentPage === totalPages || totalPages === 0
          }
          className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
        >
          Next →
        </button>

      </div>

    </div>
  );
}