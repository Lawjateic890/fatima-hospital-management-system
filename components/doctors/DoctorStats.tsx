interface DoctorStatsProps {
  total: number;
  departments: number;
  specializations: number;
}

export default function DoctorStats({
  total,
  departments,
  specializations,
}: DoctorStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">Total Doctors</h3>
        <p className="text-3xl font-bold text-blue-600">{total}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">Departments</h3>
        <p className="text-3xl font-bold text-green-600">{departments}</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-gray-500">Specializations</h3>
        <p className="text-3xl font-bold text-pink-600">
          {specializations}
        </p>
      </div>
    </div>
  );
}