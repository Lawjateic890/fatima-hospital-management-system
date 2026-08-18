interface PatientToolbarProps {
  onExport: () => void;
  onExportPDF: () => void;
}

export default function PatientToolbar({
  onExport,
  onExportPDF,
}: PatientToolbarProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        👥 Patients Management
      </h2>

      <div className="flex gap-3">

        <button
          onClick={onExportPDF}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          📄 Export PDF
        </button>

        <button
          onClick={onExport}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          📊 Export Excel
        </button>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          + Add Patient
        </button>

      </div>
    </div>
  );
}