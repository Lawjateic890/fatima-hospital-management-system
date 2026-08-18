"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function CalendarFilters({
  search,
  setSearch,
}: Props) {
  return (
    <div className="mb-6">

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search patient or doctor..."
        className="w-full lg:w-96 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}