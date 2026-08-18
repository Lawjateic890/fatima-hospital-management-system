interface Props {
  search: string;
  setSearch: (value: string) => void;

  gender: string;
  setGender: (value: string) => void;

  bloodGroup: string;
  setBloodGroup: (value: string) => void;
}

export default function PatientFilters({
  search,
  setSearch,
  gender,
  setGender,
  bloodGroup,
  setBloodGroup,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mb-8 flex flex-wrap gap-4 items-center">

      <input
        type="text"
        placeholder="🔍 Search patient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-3 w-72 text-black"
      />

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="border rounded-lg px-4 py-3 text-black"
      >
        <option value="">All Genders</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <select
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
        className="border rounded-lg px-4 py-3 text-black"
      >
        <option value="">All Blood Groups</option>
        <option>A+</option>
        <option>A-</option>
        <option>B+</option>
        <option>B-</option>
        <option>AB+</option>
        <option>AB-</option>
        <option>O+</option>
        <option>O-</option>
      </select>

    </div>
  );
}