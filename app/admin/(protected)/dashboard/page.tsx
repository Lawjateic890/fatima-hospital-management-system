"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Users,
  Stethoscope,
  Building2,
  CalendarDays,
} from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import StatCard from "@/components/ui/StatCard";

import GenderChart from "@/components/charts/GenderChart";
import AppointmentsChart from "@/components/charts/AppointmentsChart";
import PatientsPerMonthChart from "@/components/charts/PatientsPerMonthChart";
import AppointmentsPerMonthChart from "@/components/charts/AppointmentsPerMonthChart";
import NewReturningPatientsChart from "@/components/charts/NewReturningPatientsChart";
import NotificationDropdown from "@/components/ui/NotificationDropdown";
interface DashboardStats {
  patients: number;
  doctors: number;
  departments: number;
  appointments: number;

  newPatients: number;
  returningPatients: number;

  recentPatients: {
    full_name: string;
    gender: string;
    disease: string;
  }[];

  recentAppointments: {
    appointment_date: string;
    appointment_time: string;
    status: string;
  }[];

  genderStats: {
    gender: string;
    total: string;
  }[];

  appointmentStats: {
    status: string;
    total: string;
  }[];

  patientsPerMonth: {
    month: string;
    total: string;
  }[];

  appointmentsPerMonth: {
    month: string;
    total: string;
  }[];
}

export default function DashboardPage() {

  const router = useRouter();

  const [currentTime, setCurrentTime] = useState(new Date());

  const [stats, setStats] = useState<DashboardStats>({
    patients: 0,
    doctors: 0,
    departments: 0,
    appointments: 0,

    newPatients: 0,
    returningPatients: 0,

    recentPatients: [],
    recentAppointments: [],

    genderStats: [],
    appointmentStats: [],

    patientsPerMonth: [],
    appointmentsPerMonth: [],
  });

  useEffect(() => {
    loadDashboard();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  async function loadDashboard() {
    try {
      const res = await fetch("http://localhost:5000/dashboard");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  }

  const maleCount =
    Number(stats.genderStats.find(g => g.gender === "Male")?.total ?? 0);

  const femaleCount =
    Number(stats.genderStats.find(g => g.gender === "Female")?.total ?? 0);

  const confirmedCount =
    Number(stats.appointmentStats.find(a => a.status === "Confirmed")?.total ?? 0);

  const pendingCount =
    Number(stats.appointmentStats.find(a => a.status === "Pending")?.total ?? 0);

  const cancelledCount =
    Number(stats.appointmentStats.find(a => a.status === "Cancelled")?.total ?? 0);

  const appointmentMonths =
    stats.appointmentsPerMonth.map(item => item.month);

  const appointmentTotals =
    stats.appointmentsPerMonth.map(item => Number(item.total));

  const months =
    stats.patientsPerMonth.map(item => item.month);

  const totals =
    stats.patientsPerMonth.map(item => Number(item.total));

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <PageHeader
  title="Hospital Dashboard"
  subtitle="Welcome back, Administrator"
  action={<NotificationDropdown />}
/>

      <Card className="mb-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">

        <div className="flex justify-between items-center flex-wrap gap-6">

          <div>

            <h2 className="text-3xl font-bold">
              👋 Welcome Administrator
            </h2>

            <p className="text-blue-100 mt-3">
              Manage patients, doctors and appointments.
            </p>

          </div>

          <div className="text-right">

            <p className="text-blue-200">

              Good {

                currentTime.getHours() < 12

                  ? "Morning"

                  : currentTime.getHours() < 18

                  ? "Afternoon"

                  : "Evening"

              }

            </p>

            <h2 className="text-4xl font-bold">

              {currentTime.toLocaleTimeString()}

            </h2>

            <p className="text-blue-200">

              {currentTime.toLocaleDateString()}

            </p>

          </div>

        </div>

      </Card>
      {/* Quick Actions */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <button
          onClick={() => router.push("/admin/patients")}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-5 shadow-lg transition hover:scale-105"
        >
          <div className="text-4xl mb-3">👤</div>
          <h3 className="font-bold">Add Patient</h3>
        </button>

        <button
          onClick={() => router.push("/admin/doctors")}
          className="bg-green-600 hover:bg-green-700 text-white rounded-2xl p-5 shadow-lg transition hover:scale-105"
        >
          <div className="text-4xl mb-3">👨‍⚕️</div>
          <h3 className="font-bold">Add Doctor</h3>
        </button>

        <button
          onClick={() => router.push("/admin/appointments")}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl p-5 shadow-lg transition hover:scale-105"
        >
          <div className="text-4xl mb-3">📅</div>
          <h3 className="font-bold">Appointments</h3>
        </button>

        <button
          onClick={() => router.push("/admin/departments")}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl p-5 shadow-lg transition hover:scale-105"
        >
          <div className="text-4xl mb-3">🏥</div>
          <h3 className="font-bold">Departments</h3>
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Patients"
          value={stats.patients}
          icon={Users}
          color="text-blue-600"
        />

        <StatCard
          title="Doctors"
          value={stats.doctors}
          icon={Stethoscope}
          color="text-green-600"
        />

        <StatCard
          title="Departments"
          value={stats.departments}
          icon={Building2}
          color="text-purple-600"
        />

        <StatCard
          title="Appointments"
          value={stats.appointments}
          icon={CalendarDays}
          color="text-red-600"
        />

      </div>

      {/* Recent Section */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <Card>

          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            Recent Patients
          </h2>

          {stats.recentPatients.map((patient, index) => (

            <div
              key={index}
              className="flex justify-between py-3 border-b last:border-none"
            >

              <div>

                <p className="font-semibold text-slate-800">
                  {patient.full_name}
                </p>

                <p className="text-slate-500">
                  {patient.gender}
                </p>

              </div>

              <span className="font-semibold text-red-600">
                {patient.disease || "N/A"}
              </span>

            </div>

          ))}

        </Card>

        <Card>

          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            Recent Appointments
          </h2>

          {stats.recentAppointments.map((appointment, index) => (

            <div
              key={index}
              className="flex justify-between py-3 border-b last:border-none"
            >

              <div>

                <p className="font-semibold text-slate-800">
                  {new Date(
                    appointment.appointment_date
                  ).toLocaleDateString()}
                </p>

                <p className="text-slate-500">
                  {appointment.appointment_time.slice(0,5)}
                </p>

              </div>

              <span className="font-semibold text-green-600">
                {appointment.status}
              </span>

            </div>

          ))}

        </Card>

      </div>
      {/* Dashboard Widgets */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

        <Card>

          <h2 className="text-2xl font-bold text-blue-700 mb-5">
            📅 Today's Summary
          </h2>

          <div className="space-y-4 text-slate-700">

            <div className="flex justify-between font-medium">
              <span>Total Patients</span>
              <span className="font-bold text-blue-600">
                {stats.patients}
              </span>
            </div>

<div className="flex justify-between font-medium">
                <span>Total Doctors</span>
              <span className="font-bold text-green-600">
                {stats.doctors}
              </span>
            </div>

<div className="flex justify-between font-medium">
              <span>Appointments</span>
              <span className="font-bold text-purple-600">
                {stats.appointments}
              </span>
            </div>

            <div className="flex justify-between font-medium">
              <span>Departments</span>
              <span className="font-bold text-orange-600">
                {stats.departments}
              </span>
            </div>

          </div>

        </Card>

        <Card>

          <h2 className="text-2xl font-bold text-green-700 mb-5">
            🟢 System Status
          </h2>

          <div className="space-y-4 text-slate-700 font-medium">

            <p>✅ Database Connected</p>
            <p>✅ API Running</p>
            <p>✅ Authentication Active</p>
            <p>✅ Dashboard Online</p>

          </div>

        </Card>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

        <GenderChart
          male={maleCount}
          female={femaleCount}
        />

        <AppointmentsChart
          confirmed={confirmedCount}
          pending={pendingCount}
          cancelled={cancelledCount}
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

        <PatientsPerMonthChart
          months={months}
          totals={totals}
        />

        <AppointmentsPerMonthChart
          months={appointmentMonths}
          totals={appointmentTotals}
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

        <NewReturningPatientsChart
          newPatients={stats.newPatients}
          returningPatients={stats.returningPatients}
        />

      </div>

    </div>
  );
}