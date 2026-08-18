"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
      w-full
      lg:w-96
      px-4
      py-3
      rounded-xl
      border
      border-gray-300
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      "
    />
  );
}