"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  male: number;
  female: number;
}

export default function GenderChart({
  male,
  female,
}: Props) {
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [male, female],
        backgroundColor: [
          "#3B82F6",
          "#EC4899",
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Patients by Gender
      </h2>

      <div className="w-[350px] h-[350px] mx-auto">
        <Pie
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}