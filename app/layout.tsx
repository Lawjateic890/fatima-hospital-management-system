import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import LayoutContent from "@/components/LayoutContent";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { NotificationProvider } from "@/context/NotificationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fatima Hospital",
  description: "Hospital Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-gray-50">
        <NotificationProvider>
          {/* This will automatically show Navbar + Footer */}
          <LayoutContent>
            {children}
          </LayoutContent>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />
        </NotificationProvider>
      </body>
    </html>
  );
}