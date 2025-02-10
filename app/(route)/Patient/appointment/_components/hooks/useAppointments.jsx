import { create } from "zustand"
import { mockAppointments } from "../data/mockData"

export const useAppointments = create(set => ({
  appointments: [
    ...mockAppointments,
    {
      id: "4",
      date: "2024-03-28",
      time: "9:00 AM",
      doctor: {
        id: "d4",
        name: "David Lee",
        specialization: "Dermatologist",
        imageUrl:
          "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200"
      },
      location: "Medical Center - Room 305",
      type: "Skin Consultation",
      mode: "in-person",
      status: "confirmed"
    },
    {
      id: "5",
      date: "2024-04-02",
      time: "3:15 PM",
      doctor: {
        id: "d5",
        name: "Rachel Green",
        specialization: "Nutritionist",
        imageUrl:
          "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200"
      },
      location: "Virtual Consultation",
      type: "Diet Planning",
      mode: "telehealth",
      status: "confirmed"
    }
  ],
  addAppointment: appointment =>
    set(state => ({
      appointments: [...state.appointments, appointment]
    })),
  cancelAppointment: id =>
    set(state => ({
      appointments: state.appointments.filter(app => app.id !== id)
    }))
}))
