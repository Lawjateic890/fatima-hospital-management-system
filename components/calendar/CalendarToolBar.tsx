"use client";

interface Props {
  refresh: () => void;
}

export default function CalendarToolbar({
  refresh,
}: Props) {
  return (
    <div className="flex justify-end mb-5">

      <button
        onClick={refresh}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
      >
        Refresh Calendar
      </button>

    </div>
  );
}