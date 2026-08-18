interface Department {
  department_id: number;
  department_name: string;
}

interface DoctorFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;

  departments: Department[];
}

export default function DoctorFilters({
  searchTerm,
  setSearchTerm,
  selectedDepartment,
  setSelectedDepartment,
  departments,
}: DoctorFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-8 mb-6">

      <input
        type="text"
        placeholder="🔍 Search doctors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <select
  value={selectedDepartment}
  onChange={(e) => setSelectedDepartment(e.target.value)}
  className="w-full md:w-64 px-4 py-3 bg-white border border-gray-300 rounded-xl shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
>
        <option value="" className="text-gray-900">
  All Departments
</option>

        {departments.map((department) => (
  <option
    key={department.department_id}
    value={department.department_id}
    className="text-gray-900"
  >
    {department.department_name}
  </option>
))}
      </select>

    </div>
  );
}