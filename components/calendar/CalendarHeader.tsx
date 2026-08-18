"use client";

import { CalendarDays } from "lucide-react";

export default function CalendarHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">

      <div>
        <h1 className="flex items-center gap-3 text-4xl font-bold text-blue-700">
          <CalendarDays size={38} />
          Appointment Calendar
        </h1>

        <p className="text-gray-600 mt-2">
          View and manage hospital appointments in calendar format.
        </p>
      </div>

    </div>
  );
}