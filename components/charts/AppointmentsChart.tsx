"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

interface Props {
  confirmed: number;
  pending: number;
  cancelled: number;
}

export default function AppointmentsChart({
  confirmed,
  pending,
  cancelled,
}: Props) {
  const data = {
    labels: ["Confirmed", "Pending", "Cancelled"],
    datasets: [
      {
        label: "Appointments",
        data: [confirmed, pending, cancelled],
        backgroundColor: [
          "#22C55E",
          "#F59E0B",
          "#EF4444",
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">
        Appointment Status
      </h2>

      <div className="h-80">
        <Bar
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