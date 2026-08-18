"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Building2,
  CalendarDays,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Patients", href: "/admin/patients", icon: Users },
    { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
    { name: "Departments", href: "/admin/departments", icon: Building2 },
    { name: "Appointments", href: "/admin/appointments", icon: CalendarDays },
    { name: "Messages", href: "/admin/messages", icon: Mail },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen shadow-xl flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold flex items-center gap-2">
  <Building2 size={28} />
  <span>Fatima Hospital</span>
</h1>

        <p className="text-blue-200 text-sm mt-1">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-4 transition duration-200 ${
  pathname === item.href
    ? "bg-blue-600 border-r-4 border-white font-semibold"
    : "hover:bg-blue-800"
}`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-blue-700">

  <div className="flex items-center gap-3">

    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
      A
    </div>

    <div>
      <p className="font-semibold">
        Administrator
      </p>

      <p className="text-blue-200 text-sm">
        admin@fatimahospital.com
      </p>
    </div>

  </div>

</div>

      {/* Logout */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("admin");
            window.location.href = "/admin/login";
          }}
          className="w-full bg-red-500 hover:bg-red-600 transition-all duration-300 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}