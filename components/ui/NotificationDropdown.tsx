"use client";

import { Bell, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Notification {
  id: number;
  message: string;
  time: string;
}

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      const res = await fetch("http://localhost:5000/notifications");

      if (!res.ok) return;

      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-slate-100 transition"
      >
        <Bell size={22} />

        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border z-50">

          <div className="flex justify-between items-center p-4 border-b">

            <h2 className="font-bold text-lg">
              Notifications
            </h2>

            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>

          </div>

          <div className="max-h-96 overflow-y-auto">

            {notifications.length === 0 ? (

              <p className="text-center text-gray-500 py-10">
                No notifications
              </p>

            ) : (

              notifications.map((item) => (

                <div
                  key={item.id}
                  className="border-b p-4 hover:bg-slate-50"
                >
                  <p className="font-medium">
                    {item.message}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.time}
                  </p>

                </div>

              ))

            )}

          </div>

        </div>
      )}
    </div>
  );
}