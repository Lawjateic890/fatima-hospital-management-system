"use client";

import { useEffect, useState } from "react";
import PatientStats from "@/components/patients/PatientStats";
import PatientModal from "@/components/patients/PatientModal";
import PatientTable from "@/components/patients/PatientTable";
import PatientForm from "@/components/patients/PatientForm";
import PatientToolbar from "@/components/patients/PatientToolbar";
import PatientFilters from "@/components/patients/PatientFilters";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState("");
  const [filterBloodGroup, setFilterBloodGroup] = useState("");

const [isEditing, setIsEditing] = useState(false);
const [editingId, setEditingId] = useState<number | null>(null);
const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
const [showModal, setShowModal] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [bloodGroup, setBloodGroup] = useState("A+");
  const [disease, setDisease] = useState("");
  const [dob, setDob] = useState("");
 
  const loadPatients = async () => {
    try {
      const res = await fetch("http://localhost:5000/patients");
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const editPatient = (patient: Patient) => {
  setEditingId(patient.patient_id);

  setFullName(patient.full_name);
  setEmail(patient.email);
  setPhone(patient.phone);
  setGender(patient.gender);
  setBloodGroup(patient.blood_group);
  setDisease(patient.disease);
  setDob(patient.date_of_birth.split("T")[0]);

  setIsEditing(true);
};

const viewPatient = (patient: Patient) => {
  setSelectedPatient(patient);
  setShowModal(true);
};


  const addPatient = async () => {
    if (
      !fullName ||
      !email ||
      !phone ||
      !disease ||
      !dob
    ) {
      alert("Please fill all fields.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/patients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          gender,
          blood_group: bloodGroup,
          disease,
          date_of_birth: dob,
        }),
      }
    );

    if (!response.ok) {
  const error = await response.json();
  alert(error.message);
  return;
}

    alert("Patient Added Successfully!");

    setFullName("");
    setEmail("");
    setPhone("");
    setGender("Male");
    setBloodGroup("A+");
    setDisease("");
    setDob("");

    loadPatients();
  };
const updatePatient = async () => {
  const response = await fetch(
    `http://localhost:5000/patients/${editingId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        phone,
        gender,
        blood_group: bloodGroup,
        disease,
        date_of_birth: dob,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    alert(error.message);
    return;
  }

  alert("Patient Updated Successfully!");

  setIsEditing(false);
  setEditingId(null);

  setFullName("");
  setEmail("");
  setPhone("");
  setGender("Male");
  setBloodGroup("A+");
  setDisease("");
  setDob("");

  loadPatients();
};
 

  const deletePatient = async (id: number) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this patient?"
  );

  if (!confirmDelete) return;

  const response = await fetch(
    `http://localhost:5000/patients/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    alert("Failed to archive patient.");
    return;
  }

  loadPatients();
};

const exportToExcel = () => {
  const exportData = patients.map((patient) => ({
  "Full Name": patient.full_name,
  Email: patient.email,
  Phone: patient.phone,
  Gender: patient.gender,
  "Blood Group": patient.blood_group,
  Disease: patient.disease,
  "Date of Birth": new Date(
    patient.date_of_birth
  ).toLocaleDateString(),
}));

const worksheet = XLSX.utils.json_to_sheet(exportData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Patients"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(data, "Patients.xlsx");
};
const exportToPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(22);
doc.setTextColor(0, 102, 204);
doc.text("FATIMA HOSPITAL", 14, 18);

doc.setFontSize(16);
doc.setTextColor(60);
doc.text("Patient Report", 14, 30);

doc.setFontSize(10);
doc.text(
  `Generated on: ${new Date().toLocaleString()}`,
  14,
  38
);

  const tableData = patients.map((patient) => [
    patient.full_name,
    patient.gender,
    patient.blood_group,
    patient.phone,
    patient.disease,
    new Date(patient.date_of_birth).toLocaleDateString(),
  ]);

 autoTable(doc, {
  head: [[
    "Full Name",
    "Gender",
    "Blood Group",
    "Phone",
    "Disease",
    "Date of Birth",
  ]],
  body: tableData,
  startY: 45,

  styles: {
    fontSize: 10,
  },

  headStyles: {
    fillColor: [37, 99, 235],
  },

  alternateRowStyles: {
    fillColor: [245, 245, 245],
  },
});

  doc.save("Patients_Report.pdf");
};
  return (
  <div className="min-h-screen bg-slate-100 p-10">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">

      <div>
        <h1 className="text-4xl font-bold text-blue-700">
          Patient Management
        </h1>

        <p className="text-gray-500 mt-2">
          Manage all registered patients.
        </p>
      </div>

     <PatientStats
  total={patients.length}
  males={patients.filter((p) => p.gender === "Male").length}
  females={patients.filter((p) => p.gender === "Female").length}
  bloodGroups={new Set(patients.map((p) => p.blood_group)).size}
/>

    </div>

    {/* Add / Edit Patient Card */}
    <div className="bg-white rounded-xl shadow-xl p-8 mb-10">

     <PatientToolbar
  onExport={exportToExcel}
  onExportPDF={exportToPDF}
/>

      <PatientFilters
  search={search}
  setSearch={setSearch}
  gender={filterGender}
  setGender={setFilterGender}
  bloodGroup={filterBloodGroup}
  setBloodGroup={setFilterBloodGroup}
/>

      <PatientForm
        fullName={fullName}
        setFullName={setFullName}

        email={email}
        setEmail={setEmail}

        phone={phone}
        setPhone={setPhone}

        gender={gender}
        setGender={setGender}

        bloodGroup={bloodGroup}
        setBloodGroup={setBloodGroup}

        disease={disease}
        setDisease={setDisease}

        dob={dob}
        setDob={setDob}

        isEditing={isEditing}

        onSubmit={isEditing ? updatePatient : addPatient}
      />

    </div>

    {/* Patients Table */}
    <PatientTable
  patients={patients}
  search={search}
  gender={filterGender}
  bloodGroup={filterBloodGroup}
  onView={viewPatient}
  onEdit={editPatient}
  onDelete={deletePatient}
/>

    {/* Patient Details Modal */}
    <PatientModal
      patient={selectedPatient}
      open={showModal}
      onClose={() => setShowModal(false)}
    />

  </div>
);
}