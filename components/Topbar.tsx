"use client";

import NotificationBell from "./NotificationBell";

export default function Topbar() {
  return (
    <header className="h-16 bg-white shadow-sm border-b flex items-center justify-between px-8">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Fatima Hospital Admin
        </h1>

        <p className="text-sm text-gray-500">
          Hospital Management System
        </p>
      </div>

      <div className="flex items-center gap-6">

        <NotificationBell />

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              Administrator
            </p>

            <p className="text-xs text-gray-500">
              Admin Panel
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}