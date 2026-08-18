"use client";

import { useEffect, useMemo, useState } from "react";

interface Department {
  department_id: number;
  department_name: string;
  description: string;
}

export default function DepartmentsPage() {

  const [departments, setDepartments] =
    useState<Department[]>([]);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingDepartmentId, setEditingDepartmentId] =
    useState<number | null>(null);

  const [departmentName, setDepartmentName] =
    useState("");

  const [description, setDescription] =
    useState("");

  // -----------------------------
  // LOAD DEPARTMENTS
  // -----------------------------

  const loadDepartments = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/departments"
      );

      const data = await res.json();

      setDepartments(data);

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {
    loadDepartments();
  }, []);

  // -----------------------------
  // SEARCH
  // -----------------------------

  const filteredDepartments = useMemo(() => {

    return departments.filter((department) =>
      department.department_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [departments, search]);

  // -----------------------------
  // ADD
  // -----------------------------

  const addDepartment = async () => {

    if (!departmentName) {
      alert("Department name is required.");
      return;
    }

    try {

      const response = await fetch(
        "http://localhost:5000/departments",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            department_name: departmentName,
            description,
          }),
        }
      );

      if (!response.ok) {

        const error = await response.json();

        alert(error.message);

        return;

      }

      alert("Department added successfully!");

      setDepartmentName("");
      setDescription("");

      setShowModal(false);

      loadDepartments();

    } catch (err) {

      console.error(err);

      alert("Server Error");

    }

  };
  // -----------------------------
  // UPDATE
  // -----------------------------

  const updateDepartment = async () => {

    if (editingDepartmentId === null) return;

    try {

      const response = await fetch(
        `http://localhost:5000/departments/${editingDepartmentId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            department_name: departmentName,
            description,
          }),
        }
      );

      if (!response.ok) {

        const error = await response.json();

        alert(error.message);

        return;

      }

      alert("Department updated successfully!");

      setEditingDepartmentId(null);

      setDepartmentName("");
      setDescription("");

      setShowModal(false);

      loadDepartments();

    } catch (err) {

      console.error(err);

      alert("Server Error");

    }

  };

  // -----------------------------
  // DELETE
  // -----------------------------

  const deleteDepartment = async (
    id: number
  ) => {

    const confirmDelete = confirm(
      "Delete this department?"
    );

    if (!confirmDelete) return;

    try {

      const response = await fetch(
        `http://localhost:5000/departments/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);

      loadDepartments();

    } catch (err) {

      console.error(err);

      alert("Server Error");

    }

  };

  // -----------------------------
  // RETURN
  // -----------------------------

  return (
    <div className="min-h-screen bg-slate-100 p-8">

  {/* Header */}

  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">

    <div>

      <h1 className="text-4xl font-bold text-blue-700">
        Departments Management
      </h1>

      <p className="text-gray-600 mt-2">
        Manage all hospital departments.
      </p>

    </div>

    <button
      onClick={() => {
        setEditingDepartmentId(null);
        setDepartmentName("");
        setDescription("");
        setShowModal(true);
      }}
      className="mt-5 lg:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold"
    >
      + Add Department
    </button>

  </div>

  {/* Statistics */}

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

    <div className="bg-white rounded-xl shadow-lg p-6">

      <p className="text-gray-500">
        Total Departments
      </p>

      <h2 className="text-4xl font-bold text-blue-700 mt-2">
        {departments.length}
      </h2>

    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">

      <p className="text-gray-500">
        Search Results
      </p>

      <h2 className="text-4xl font-bold text-green-600 mt-2">
        {filteredDepartments.length}
      </h2>

    </div>

    <div className="bg-white rounded-xl shadow-lg p-6">

      <p className="text-gray-500">
        Active Departments
      </p>

      <h2 className="text-4xl font-bold text-purple-600 mt-2">
  {departments.length}
</h2>

</div>

</div>

{/* Search */}

<div className="bg-white rounded-xl shadow-lg p-6 mb-8">

  <input
    type="text"
    placeholder="Search department..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

</div>

{/* Department Cards */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  {filteredDepartments.map((department) => (

    <div
      key={department.department_id}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6"
    >

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">
              🏥
            </div>

            <div>

              <h2 className="text-2xl font-bold text-black">
                {department.department_name}
              </h2>

              <p className="text-gray-500 mt-2">
                {department.description || "No description available."}
              </p>

            </div>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => {
              setEditingDepartmentId(
                department.department_id
              );

              setDepartmentName(
                department.department_name
              );

              setDescription(
                department.description || ""
              );

              setShowModal(true);
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
          >
            Edit
          </button>

          <button
            onClick={() =>
              deleteDepartment(
                department.department_id
              )
            }
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  ))}

</div>

{filteredDepartments.length === 0 && (

  <div className="bg-white rounded-xl shadow-lg p-10 text-center mt-10">

    <h2 className="text-2xl font-bold text-gray-700">
      No Departments Found
    </h2>

    <p className="text-gray-500 mt-2">
      Try another search.
    </p>

  </div>

)}
{/* Add / Edit Department Modal */}

{showModal && (

  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">

      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        {editingDepartmentId === null
          ? "Add Department"
          : "Edit Department"}
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Department Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          className="w-full border rounded-lg p-3 text-black"
        />

        <textarea
          placeholder="Department Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border rounded-lg p-3 text-black resize-none"
        />

      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          onClick={() => {
            setEditingDepartmentId(null);
            setDepartmentName("");
            setDescription("");
            setShowModal(false);
          }}
          className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (editingDepartmentId === null) {
              addDepartment();
            } else {
              updateDepartment();
            }
          }}
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          {editingDepartmentId === null
            ? "Save Department"
            : "Update Department"}
        </button>

      </div>

    </div>

  </div>

)}

</div>
  );
}