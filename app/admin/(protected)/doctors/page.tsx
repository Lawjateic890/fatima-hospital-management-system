"use client";

import { useEffect, useState } from "react";

import DoctorStats from "@/components/doctors/DoctorStats";
import DoctorToolbar from "@/components/doctors/DoctorToolbar";
import DoctorCard from "@/components/doctors/DoctorCard";
import DoctorFilters from "@/components/doctors/DoctorFilters";
import ViewDoctorModal from "@/components/doctors/ViewDoctorModal";import DoctorModal from "@/components/doctors/DoctorModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import notify from "@/utils/notify";
import { useNotifications } from "@/context/NotificationContext";


interface Doctor {
  doctor_id: number;
  full_name: string;
  specialization: string;
  email?: string;
  phone?: string;
  department_id?: number;
  image?: string;
}

interface Department {
  department_id: number;
  department_name: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
const [showViewModal, setShowViewModal] = useState(false);
const [editingDoctor, setEditingDoctor] = useState<any>(null);
const { addNotification } = useNotifications();
  const loadDoctors = async () => {
  try {
    const res = await fetch("http://localhost:5000/doctors");
    const data = await res.json();
    setDoctors(data);
  } catch (error) {
    console.error("Failed to load doctors:", error);
  }
};

const loadDepartments = async () => {
  try {
    const res = await fetch("http://localhost:5000/departments");
    const data = await res.json();
    setDepartments(data);
  } catch (error) {
    console.error("Failed to load departments:", error);
  }
};
const saveDoctor = async (doctor: {
  full_name: string;
  specialization: string;
  email: string;
  phone: string;
  department_id: number;
  image: string;
}) => {
  try {
    let res;

    if (editingDoctor) {
      // UPDATE existing doctor
      res = await fetch(
        `http://localhost:5000/doctors/${editingDoctor.doctor_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctor),
        }
      );
    } else {
      // ADD new doctor
      res = await fetch("http://localhost:5000/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      });
    }

    if (!res.ok) {
      throw new Error("Failed to save doctor");
    }

    await loadDoctors();

    setShowAddModal(false);
    setEditingDoctor(null);

   const message = editingDoctor
  ? "Doctor updated successfully!"
  : "Doctor added successfully!";

notify.success(message);

addNotification({
  title: editingDoctor ? "Doctor Updated" : "New Doctor",
  message: doctor.full_name,
});
  } catch (error) {
    console.error(error);
    notify.error("Failed to save doctor.");
  }
};

const deleteDoctor = async (doctorId: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this doctor?"
  );

  if (!confirmed) return;

  try {
    const res = await fetch(
      `http://localhost:5000/doctors/${doctorId}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to delete doctor");
    }

    await loadDoctors();

    notify.success("Doctor deleted successfully!");

addNotification({
  title: "Doctor Deleted",
  message: `Doctor ID ${doctorId} was removed`,
});

  } catch (error) {
    console.error(error);
    notify.error("Failed to delete doctor.");
  }
};
const exportToExcel = () => {
  const data = doctors.map((doctor) => ({
    ID: doctor.doctor_id,
    Name: doctor.full_name,
    Specialization: doctor.specialization,
    Email: doctor.email,
    Phone: doctor.phone,
    Department: doctor.department_id,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Doctors"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Doctors.xlsx");
};
const exportToPDF = () => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.setTextColor(0, 102, 204);
  doc.text("Fatima Hospital", 14, 20);

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Doctors Report", 14, 30);

  // Date
  doc.setFontSize(11);
  doc.text(
    `Generated: ${new Date().toLocaleDateString()}`,
    14,
    38
  );

  autoTable(doc, {
    startY: 45,
    head: [["ID", "Name", "Specialization", "Email", "Phone", "Department"]],
    body: doctors.map((doctor) => [
      doctor.doctor_id,
      doctor.full_name,
      doctor.specialization,
      doctor.email || "",
      doctor.phone || "",
      doctor.department_id || "",
    ]),
    theme: "grid",
    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  doc.save("Doctors_Report.pdf");
};

 useEffect(() => {
  loadDoctors();
  loadDepartments();
}, []);

 return (
  <div className="min-h-screen bg-slate-100 p-8">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
      <div>
        <h1 className="text-4xl font-bold text-blue-700">
          Doctors Management
        </h1>

        <p className="text-gray-600 mt-2">
          Manage all doctors working at Fatima Hospital.
        </p>
      </div>

      <DoctorToolbar
  onExportExcel={exportToExcel}
  onExportPDF={exportToPDF}
  onAddDoctor={() => {
    setEditingDoctor(null);
    setShowAddModal(true);
  }}
/>
    </div>

    {/* Statistics */}
    <DoctorStats
      total={doctors.length}
      departments={departments.length}
      specializations={0}
    />
   <DoctorFilters
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}

  selectedDepartment={selectedDepartment}
  setSelectedDepartment={setSelectedDepartment}

  departments={departments}
/>


    {/* Doctors Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {doctors
  .filter((doctor) => {
    const matchesSearch =
      doctor.full_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      doctor.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "" ||
      doctor.department_id?.toString() === selectedDepartment;

    return matchesSearch && matchesDepartment;
  })
  .map((doctor) => (
        <DoctorCard
          key={doctor.doctor_id}
          doctor={doctor}
          onView={() => {
  setSelectedDoctor(doctor);
  setShowViewModal(true);
}}
         onEdit={() => {
  setEditingDoctor(doctor);
  setShowAddModal(true);
}}
          onDelete={() => deleteDoctor(doctor.doctor_id)}
        />
      ))}
    </div>
    <ViewDoctorModal
  doctor={selectedDoctor}
  isOpen={showViewModal}
  onClose={() => {
    setShowViewModal(false);
    setSelectedDoctor(null);
  }}
/>
<DoctorModal
  isOpen={showAddModal}
  onClose={() => {
    setShowAddModal(false);
    setEditingDoctor(null);
  }}
  onSave={saveDoctor}
  doctor={editingDoctor}
/>
  </div>
);
}