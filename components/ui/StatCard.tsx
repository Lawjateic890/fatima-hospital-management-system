"use client";

import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number | string;
  color?: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  color = "text-blue-600",
  icon: Icon,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className={`text-4xl font-bold mt-2 ${color}`}>
            {value}
          </h2>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">

          <Icon className={color} size={30} />

        </div>

      </div>

    </div>
  );
}