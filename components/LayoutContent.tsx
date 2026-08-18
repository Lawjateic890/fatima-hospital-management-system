"use client";

import Navbar from "./website/Navbar";
import Footer from "./website/Footer";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}