"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "success" | "error" | "warning" | "info";
  read: boolean;
}

interface AddNotificationData {
  title: string;
  message: string;
  type?: Notification["type"];
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: AddNotificationData) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext =
  createContext<NotificationContextType | null>(null);

export function NotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications from browser
  useEffect(() => {
    const saved = localStorage.getItem("notifications");

    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch {
        localStorage.removeItem("notifications");
      }
    }
  }, []);

  // Save notifications
  useEffect(() => {
    localStorage.setItem(
      "notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  // Add notification
  const addNotification = ({
    title,
    message,
    type = "info",
  }: AddNotificationData) => {
    setNotifications((prev) => {
      // Prevent duplicate notifications
      const exists = prev.find(
        (n) =>
          n.title === title &&
          n.message === message
      );

      if (exists) return prev;

      return [
        {
          id: Date.now(),

          title,

          message,

          time: new Date().toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          }),

          type,

          read: false,
        },

        ...prev,
      ];
    });
  };

  // Mark one notification as read
  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  // Mark every notification as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Remove every notification
  const clearNotifications = () => {
    setNotifications([]);
    localStorage.removeItem("notifications");
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
}