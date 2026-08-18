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

export default function PatientsPerMonthChart({
  months,
  totals,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Patients Per Month
      </h2>

      <div className="h-80">
        <Line
          data={{
            labels: months,
            datasets: [
              {
                label: "Patients",
                data: totals,
                borderColor: "#3B82F6",
                backgroundColor: "#93C5FD",
                fill: true,
                tension: 0.4,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
}