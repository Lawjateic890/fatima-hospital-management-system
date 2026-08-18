"use client";

import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import AppointmentModal from "../../../../components/calendar/AppointmentModal";

interface Appointment {
  appointment_id: number;
  patient_name: string;
  doctor_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
}

export default function CalendarPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const response = await fetch("http://localhost:5000/appointments");

      if (!response.ok) {
        throw new Error("Unable to fetch appointments");
      }

      const data: Appointment[] = await response.json();

      setAppointments(data);

      const calendarEvents = data.map((appointment) => ({
        id: appointment.appointment_id.toString(),
        title: `${appointment.patient_name} • ${appointment.doctor_name}`,
        date: appointment.appointment_date,

        backgroundColor:
          appointment.status === "Confirmed"
            ? "#22c55e"
            : appointment.status === "Pending"
            ? "#f59e0b"
            : "#ef4444",

        borderColor:
          appointment.status === "Confirmed"
            ? "#22c55e"
            : appointment.status === "Pending"
            ? "#f59e0b"
            : "#ef4444",

        textColor: "#ffffff",
      }));

      setEvents(calendarEvents);
    } catch (error) {
      console.error(error);
    }
  }

  function handleEventClick(info: any) {
    const appointment = appointments.find(
      (item) => item.appointment_id.toString() === info.event.id
    );

    if (!appointment) return;

    setSelectedAppointment(appointment);
    setShowModal(true);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-6 mb-8">

        <div>

          <h1 className="text-4xl font-bold text-blue-700">
            📅 Appointment Calendar
          </h1>

          <p className="text-gray-600 mt-2">
            View all appointments in calendar format.
          </p>

        </div>

        {/* Status Legend */}

        <div className="flex flex-wrap gap-6 text-sm font-medium">

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-500"></span>
            Confirmed
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
            Pending
          </div>

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-red-500"></span>
            Cancelled
          </div>

        </div>

      </div>

      {/* Calendar */}

      <div className="bg-white rounded-3xl shadow-xl border p-6">

        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}

          initialView="dayGridMonth"

          height={700}

          weekends={true}

          nowIndicator={true}

          editable={false}

          selectable

          dayMaxEvents={2}

          displayEventTime={false}

          eventDisplay="auto"

          events={events}

          eventClick={handleEventClick}

          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}

          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
          }}
        />

      </div>

      <AppointmentModal
        appointment={selectedAppointment}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedAppointment(null);
        }}
      />

    </div>
  );
}