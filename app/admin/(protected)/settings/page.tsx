"use client";

import { useEffect, useState } from "react";

interface Settings {
  hospital_name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  description: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    hospital_name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch("http://localhost:5000/settings");

      if (!res.ok) {
        throw new Error("Failed to load settings");
      }

      const data = await res.json();

      setSettings({
        hospital_name: data.hospital_name || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        website: data.website || "",
        description: data.description || "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings() {
    try {
      setSaving(true);

      const res = await fetch("http://localhost:5000/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      alert("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-blue-700">
          Loading Settings...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-700">
            Hospital Settings
          </h1>

          <p className="text-gray-700 mt-2">
            Manage your hospital information.
          </p>
        </div>

        <button
          onClick={saveSettings}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-8">

        <div className="space-y-6">

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Hospital Name
            </label>

            <input
              type="text"
              value={settings.hospital_name}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  hospital_name: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  email: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Phone
            </label>

            <input
              type="text"
              value={settings.phone}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  phone: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Address
            </label>

            <input
              type="text"
              value={settings.address}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  address: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Website
            </label>

            <input
              type="text"
              value={settings.website}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  website: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-2">
              Description
            </label>

            <textarea
              rows={5}
              value={settings.description}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  description: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black resize-none"
            />
          </div>

        </div>

      </div>

    </div>
  );
}