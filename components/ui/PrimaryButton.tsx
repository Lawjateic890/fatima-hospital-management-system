"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function PrimaryButton({
  children,
  onClick,
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-6
      py-3
      rounded-xl
      font-semibold
      transition
      shadow-md
      "
    >
      {children}
    </button>
  );
}