"use client";

import { useEffect, useState } from "react";

interface Message {
  message_id: number;
  full_name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/messages", {
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to load messages");

      const data = await res.json();

      setMessages(data);
    } catch (err) {
      console.error(err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-700">
            Messages
          </h1>

          <p className="text-gray-500 mt-2">
            Messages received from the hospital website.
          </p>
        </div>

        <button
          onClick={loadMessages}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Date</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-lg"
                >
                  Loading messages...
                </td>
              </tr>
            ) : messages.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-10 text-gray-500"
                >
                  No messages found.
                </td>
              </tr>
            ) : (
              messages.map((msg) => (
                <tr
  key={msg.message_id}
  className="border-b bg-white text-black opacity-100"
>
                  <td className="p-4 text-black font-medium">
                    {msg.full_name}
                  </td>

                  <td className="p-4 text-black font-medium">
                    {msg.email}
                  </td>

                  <td className="p-4 text-black font-medium">
                    {msg.subject}
                  </td>

                  <td className="p-4 text-black font-medium">
                    {msg.message}
                  </td>

                  <td className="p-4 text-black font-medium">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}