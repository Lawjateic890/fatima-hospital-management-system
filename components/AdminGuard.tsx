"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/admin/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}