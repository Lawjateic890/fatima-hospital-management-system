"use client";

export default function CalendarLegend() {
  return (
    <div className="flex gap-8 flex-wrap items-center mb-6">

      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-full bg-green-500"></span>
        <span className="font-medium">Confirmed</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
        <span className="font-medium">Pending</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded-full bg-red-500"></span>
        <span className="font-medium">Cancelled</span>
      </div>

    </div>
  );
}