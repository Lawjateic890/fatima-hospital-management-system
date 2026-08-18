"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md border border-gray-200 p-6 ${className}`}
    >
      {children}
    </div>
  );
}