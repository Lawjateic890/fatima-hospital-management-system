"use client";

interface Props {
  total: number;
  confirmed: number;
  pending: number;
  cancelled: number;
}

export default function CalendarStats({
  total,
  confirmed,
  pending,
  cancelled,
}: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

      <div className="bg-white rounded-xl shadow-md p-5">
        <p className="text-gray-500">Total</p>
        <h2 className="text-3xl font-bold text-blue-600">
          {total}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <p className="text-gray-500">Confirmed</p>
        <h2 className="text-3xl font-bold text-green-600">
          {confirmed}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <p className="text-gray-500">Pending</p>
        <h2 className="text-3xl font-bold text-yellow-500">
          {pending}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <p className="text-gray-500">Cancelled</p>
        <h2 className="text-3xl font-bold text-red-600">
          {cancelled}
        </h2>
      </div>

    </div>
  );
}