import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  color: string;
  icon: LucideIcon;
}

export default function StatCard({
  title,
  value,
  color,
  icon,
}: StatCardProps) {

  const Icon = icon;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-gray-100">
      <div className="flex items-center justify-between">

        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className={`text-4xl font-bold mt-2 ${color}`}>
            {value}
          </h2>
        </div>

        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
          <Icon size={30} className="text-blue-600" />
        </div>

      </div>
    </div>
  );
}