"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  subtitle,
  action,
}: Props) {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          {title}
        </h1>

        {subtitle && (
          <p className="text-slate-500 mt-2">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="mt-4 lg:mt-0">
          {action}
        </div>
      )}

    </div>
  );
}