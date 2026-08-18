interface Props {
  total: number;
  males: number;
  females: number;
  bloodGroups: number;
}

export default function PatientStats({
  total,
  males,
  females,
  bloodGroups,
}: Props) {
  const cards = [
    {
      title: "Total Patients",
      value: total,
      icon: "👥",
      color: "bg-blue-500",
    },
    {
      title: "Male Patients",
      value: males,
      icon: "👨",
      color: "bg-green-500",
    },
    {
      title: "Female Patients",
      value: females,
      icon: "👩",
      color: "bg-pink-500",
    },
    {
      title: "Blood Groups",
      value: bloodGroups,
      icon: "🩸",
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
  {card.title}
</p>
              <h2 className="text-4xl font-extrabold mt-2 text-gray-900">
  {card.value}
</h2>
            </div>

            <div
              className={`${card.color} text-white w-14 h-14 rounded-xl flex items-center justify-center text-2xl`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}