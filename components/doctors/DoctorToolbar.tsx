interface DoctorToolbarProps {
  onExportExcel: () => void;
  onExportPDF: () => void;
  onAddDoctor: () => void;
}

export default function DoctorToolbar({
  onExportExcel,
  onExportPDF,
  onAddDoctor,
}: DoctorToolbarProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onExportExcel}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        📊 Export Excel
      </button>

      <button
        onClick={onExportPDF}
        className="bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        📄 Export PDF
      </button>

      <button
        onClick={onAddDoctor}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        + Add Doctor
      </button>
    </div>
  );
}