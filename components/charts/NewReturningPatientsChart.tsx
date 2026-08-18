"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface Props {
  newPatients: number;
  returningPatients: number;
}

export default function NewReturningPatientsChart({
  newPatients,
  returningPatients,
}: Props) {
  const data = {
    labels: ["New Patients", "Returning Patients"],
    datasets: [
      {
        data: [newPatients, returningPatients],
        backgroundColor: [
          "#3b82f6",
          "#22c55e",
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        New vs Returning Patients
      </h2>

      <div className="h-[350px]">
        <Pie data={data} />
      </div>
    </div>
  );
}