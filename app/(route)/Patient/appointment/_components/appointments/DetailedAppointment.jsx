import React from "react"
import { Calendar, Clock, MapPin, Video, X } from "lucide-react"
import { useAppointments } from "../hooks/useAppointments"

export function DetailedAppointment({ appointment, onCheckIn }) {
  const { cancelAppointment } = useAppointments()
  const isUpcoming = ["confirmed", "pending", "rescheduled"].includes(
    appointment.status
  )

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      <div className="flex items-start gap-4">
        <div className="relative">
          <img
            src={appointment.doctor.imageUrl}
            alt={appointment.doctor.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#7CBAE6]"
          />
          {appointment.mode === "telehealth" && (
            <div className="absolute -bottom-1 -right-1 bg-#4FA3D9 p-1 rounded-full">
              <Video className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Dr. {appointment.doctor.name}
              </h3>
              <p className="text-sm text-gray-600">
                {appointment.doctor.specialization}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium 
                  ${
                    appointment.status === "confirmed"
                      ? "bg-#75D5A5/20 text-#75D5A5"
                      : appointment.status === "pending"
                      ? "bg-#75D5A5/20 text-yellow-700"
                      : appointment.status === "rescheduled"
                      ? "bg-orange-100 text-orange-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
              >
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1)}
              </span>
              {isUpcoming && (
                <button
                  onClick={() => cancelAppointment(appointment.id)}
                  className="text-gray-400 hover:text-#FF9B9B transition-colors"
                  title="Cancel appointment"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4 text-#4FA3D9" />
              <span>{appointment.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4 text-#4FA3D9" />
              <span>{appointment.time}</span>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4 text-#4FA3D9" />
            <span>{appointment.location}</span>
          </div>

          {appointment.notes && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">{appointment.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
