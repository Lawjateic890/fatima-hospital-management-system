"use client";

import AdminGuard from "@/components/AdminGuard";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-slate-100">

        {/* Sidebar */}
        <Sidebar />

        {/* Right Side */}
        <div className="flex flex-col flex-1">

          {/* Top Header */}
          <Topbar />

          {/* Page Content */}
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>

        </div>

      </div>
    </AdminGuard>
  );
}