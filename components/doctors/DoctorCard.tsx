interface Doctor {
  doctor_id: number;
  full_name: string;
  specialization: string;
  email?: string;
  phone?: string;
  department_id?: number;
  image?: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function DoctorCard({
  doctor,
  onView,
  onEdit,
  onDelete,
}: DoctorCardProps) {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-5">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
            {doctor.image ? (
              <img
                src={doctor.image}
                alt={doctor.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-blue-700 font-bold text-2xl">
                {doctor.full_name
                  .split(" ")
                  .map((name) => name[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-black">
              {doctor.full_name}
            </h2>

            <p className="text-blue-600 font-semibold mt-1">
              {doctor.specialization}
            </p>

            <p className="text-gray-500 mt-2">
              Degree:
              <span className="italic ml-1">
                Coming Tomorrow
              </span>
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-3">
          <button
            onClick={onView}
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg"
          >
            View
          </button>

          <button
            onClick={onEdit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}