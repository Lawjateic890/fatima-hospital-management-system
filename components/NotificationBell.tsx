"use client";

import {
  Bell,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Trash2,
  CheckCheck,
  X,
} from "lucide-react";

import { useNotifications } from "@/context/NotificationContext";
import { useState, useRef, useEffect } from "react";

export default function NotificationBell() {
  const {
    notifications,
    markAsRead,
    clearNotifications,
  } = useNotifications();

  const [open, setOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return (
          <CheckCircle
            size={24}
            className="text-green-600"
          />
        );

      case "error":
        return (
          <AlertCircle
            size={24}
            className="text-red-600"
          />
        );

      case "warning":
        return (
          <AlertTriangle
            size={24}
            className="text-yellow-500"
          />
        );

      default:
        return (
          <Info
            size={24}
            className="text-blue-600"
          />
        );
    }
  };

  const getBorder = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-4 border-green-500";

      case "error":
        return "border-l-4 border-red-500";

      case "warning":
        return "border-l-4 border-yellow-500";

      default:
        return "border-l-4 border-blue-500";
    }
  };

  return (
    <div className="relative" ref={panelRef}>

      {/* Notification Button */}

      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-slate-100 transition"
      >
        <Bell size={24} className="text-gray-700" />

        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unread}
          </span>
        )}
      </button>

      {/* Panel */}

      {open && (
        <div className="absolute right-0 mt-4 w-[430px] bg-white rounded-2xl shadow-2xl border overflow-hidden z-50 animate-in fade-in slide-in-from-top-3 duration-200">

          {/* Header */}

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-4 flex justify-between items-center">

            <div>

              <h2 className="font-bold text-xl flex items-center gap-2">
                <Bell size={22} />
                Notifications
              </h2>

              <p className="text-blue-100 text-sm mt-1">
                {notifications.length} Total • {unread} Unread
              </p>

            </div>

            <div className="flex gap-2">

              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="hover:bg-white/20 rounded-lg p-2 transition"
                  title="Clear all"
                >
                  <Trash2 size={18} />
                </button>
              )}

              <button
                onClick={() => setOpen(false)}
                className="hover:bg-white/20 rounded-lg p-2 transition"
              >
                <X size={18} />
              </button>

            </div>

          </div>

          {/* Empty */}

          {notifications.length === 0 ? (
            <div className="py-16 text-center">

              <Bell
                size={50}
                className="mx-auto text-gray-300 mb-4"
              />

              <h3 className="font-semibold text-gray-700">
                No Notifications
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                You'll see hospital activity here.
              </p>

            </div>
          ) : (

            <div className="max-h-[450px] overflow-y-auto">

              {notifications.map((item) => (

                <div
                  key={item.id}
                  onClick={() => markAsRead(item.id)}
                  className={`cursor-pointer p-4 transition hover:bg-slate-50 ${getBorder(item.type)} ${
                    !item.read ? "bg-blue-50" : ""
                  }`}
                >

                  <div className="flex gap-4">

                    {getIcon(item.type)}

                    <div className="flex-1">

                      <div className="flex justify-between items-start">

                        <h3 className="font-semibold text-gray-800">
                          {item.title}
                        </h3>

                        {!item.read && (
                          <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></span>
                        )}

                      </div>

                      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                        {item.message}
                      </p>

                      <p className="text-xs text-gray-400 mt-3">
                        {item.time}
                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

          {/* Footer */}

          {notifications.length > 0 && (

            <div className="border-t bg-slate-50 p-4">

              <button
                onClick={() =>
                  notifications.forEach((n) =>
                    markAsRead(n.id)
                  )
                }
                className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"
              >
                <CheckCheck size={18} />

                Mark All as Read

              </button>

            </div>

          )}

        </div>
      )}

    </div>
  );
}