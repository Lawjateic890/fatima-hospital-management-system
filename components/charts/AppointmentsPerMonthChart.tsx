"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  months: string[];
  totals: number[];
}

export default function AppointmentsPerMonthChart({
  months,
  totals,
}: Props) {
  const data = {
    labels: months,
    datasets: [
      {
        label: "Appointments",
        data: totals,
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.25)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Appointments Per Month
      </h2>

      <div className="h-80">
        <Line
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