interface PatientFormProps {
  fullName: string;
  setFullName: (value: string) => void;

  email: string;
  setEmail: (value: string) => void;

  phone: string;
  setPhone: (value: string) => void;

  gender: string;
  setGender: (value: string) => void;

  bloodGroup: string;
  setBloodGroup: (value: string) => void;

  disease: string;
  setDisease: (value: string) => void;

  dob: string;
  setDob: (value: string) => void;

  isEditing: boolean;

  onSubmit: () => void;
}

export default function PatientForm({
  fullName,
  setFullName,

  email,
  setEmail,

  phone,
  setPhone,

  gender,
  setGender,

  bloodGroup,
  setBloodGroup,

  disease,
  setDisease,

  dob,
  setDob,

  isEditing,

  onSubmit,
}: PatientFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

      <input
        className="border border-gray-300 rounded-lg p-3 text-black"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        className="border border-gray-300 rounded-lg p-3 text-black"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border border-gray-300 rounded-lg p-3 text-black"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <select
        className="border border-gray-300 rounded-lg p-3 text-black"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option>Male</option>
        <option>Female</option>
      </select>

      <select
        className="border border-gray-300 rounded-lg p-3 text-black"
        value={bloodGroup}
        onChange={(e) => setBloodGroup(e.target.value)}
      >
        <option>A+</option>
        <option>A-</option>
        <option>B+</option>
        <option>B-</option>
        <option>AB+</option>
        <option>AB-</option>
        <option>O+</option>
        <option>O-</option>
      </select>

      <input
        className="border border-gray-300 rounded-lg p-3 text-black"
        placeholder="Disease / Chief Complaint"
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
      />

      <input
        type="date"
        className="border border-gray-300 rounded-lg p-3 text-black"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />

      <div className="flex items-end">
        <button
          onClick={onSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {isEditing ? "Update Patient" : "Add Patient"}
        </button>
      </div>

    </div>
  );
}