import React from "react"
import { User } from "lucide-react"

export function PatientDetails({ patient, doctorNotes, onNotesChange }) {
  return (
    <div className="bg-[#ffffff] rounded-xl shadow-sm border border-gray-100 hover:border-primary/10 transition-colors duration-200 p-6 mb-6 animate-[slideDown_0.3s_ease-out]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-[#4f46e5]/10 p-3 rounded-xl">
            <User className="w-6 h-6 text-[#4f46e5]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {patient.name}
            </h2>
            <div className="flex space-x-4 text-sm text-gray-600">
              <span
                className="animate-[fadeIn_0.3s_ease-out]"
                style={{ animationDelay: "0.1s" }}
              >
                ID: {patient.id}
              </span>
              <span
                className="animate-[fadeIn_0.3s_ease-out]"
                style={{ animationDelay: "0.2s" }}
              >
                Age: {patient.age}
              </span>
              <span
                className="animate-[fadeIn_0.3s_ease-out]"
                style={{ animationDelay: "0.3s" }}
              >
                Gender: {patient.gender}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-md ml-6">
          <textarea
            placeholder="Doctor's Notes..."
            value={doctorNotes}
            onChange={e => onNotesChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/50 focus:border-transparent transition-colors duration-200 resize-none"
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}
