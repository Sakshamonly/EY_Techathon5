import React from "react"
import { Calendar, Clock, MapPin, User, FileText } from "lucide-react"

export function AppointmentCard({
  date,
  time,
  doctor,
  location,
  type,
  status,
  notes
}) {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    requested: "bg-yellow-100 text-yellow-800"
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{type}</h3>
          <p className="text-gray-600 flex items-center mt-1">
            <User className="w-4 h-4 mr-2" />
            Dr. {doctor}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          {date}
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          {time}
        </div>
      </div>

      <div className="flex items-center text-gray-600 mt-2">
        <MapPin className="w-4 h-4 mr-2" />
        {location}
      </div>

      {notes && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center text-gray-600">
            <FileText className="w-4 h-4 mr-2" />
            <p className="text-sm">{notes}</p>
          </div>
        </div>
      )}
    </div>
  )
}
