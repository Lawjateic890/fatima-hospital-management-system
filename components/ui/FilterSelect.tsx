"use client";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export default function FilterSelect({
  value,
  onChange,
  options,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
      px-4
      py-3
      rounded-xl
      border
      border-gray-300
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
      "
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}