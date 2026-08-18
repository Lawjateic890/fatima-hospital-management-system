"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    router.replace("/admin/dashboard");
  }
}, [router]);

  const login = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      // Save token
      localStorage.setItem("token", data.token);

      // Save admin info
      localStorage.setItem(
        "admin",
        JSON.stringify(data.admin)
      );

      alert("Login successful!");

      router.replace("/admin/dashboard");

    } catch (err) {
      console.error(err);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        <div className="text-center mb-8">

          <div className="text-6xl mb-4">
            🏥
          </div>

          <h1 className="text-3xl font-bold text-blue-700">
            Fatima Hospital
          </h1>

          <p className="text-gray-500 mt-2">
            Admin Login
          </p>

        </div>

        <div className="space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 pr-12 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Hospital Management System
          <br />
          Secure Admin Access
        </div>

      </div>

    </div>
  );
}