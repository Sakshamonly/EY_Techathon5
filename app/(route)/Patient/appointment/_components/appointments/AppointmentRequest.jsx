import React, { useState } from "react"
import { Calendar, Clock, User, X } from "lucide-react"
import { useAppointments } from "../hooks/useAppointments"
import { Toast } from "../common/Toast"

export function AppointmentRequest({ onClose }) {
  const [showToast, setShowToast] = useState(false)
  const { addAppointment } = useAppointments()
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    time: "",
    doctor: "",
    notes: ""
  })

  const handleSubmit = e => {
    e.preventDefault()
    const newAppointment = {
      id: Date.now().toString(),
      date: formData.date,
      time: formData.time,
      doctor: {
        id: "new",
        name: formData.doctor,
        specialization: "To be assigned",
        imageUrl:
          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200"
      },
      location: "To be confirmed",
      type: formData.type,
      mode: "in-person",
      status: "pending",
      notes: formData.notes
    }

    addAppointment(newAppointment)
    setShowToast(true)
    setFormData({ type: "", date: "", time: "", doctor: "", notes: "" })

    setTimeout(() => {
      setShowToast(false)
      onClose()
    }, 2000)
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <div className="relative rounded-lg p-[2px] bg-gradient-to-r from-#4FA3D9 via-#7CBAE6 to-#FFB5A6">
        <div className="bg-white rounded-[6px] p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Request New Appointment
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="bg-white border border-gray-200 rounded-md px-4 py-2 focus:border-[#4FA3D9] focus:ring-2 focus:ring-opacity-20 focus:ring-[#4FA3D9] transition-all duration-200 w-full"
              >
                <option value="">Select type</option>
                <option value="General Checkup">General Checkup</option>
                <option value="Specialist Consultation">
                  Specialist Consultation
                </option>
                <option value="Follow-up">Follow-up</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="bg-white border border-gray-200 rounded-md px-4 py-2 focus:border-[#4FA3D9] focus:ring-2 focus:ring-opacity-20 focus:ring-[#4FA3D9] transition-all duration-200 w-full pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="bg-white border border-gray-200 rounded-md px-4 py-2 focus:border-[#4FA3D9] focus:ring-2 focus:ring-opacity-20 focus:ring-[#4FA3D9] transition-all duration-200 w-full pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Doctor
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  placeholder="Enter doctor's name (optional)"
                  className="bg-white border border-gray-200 rounded-md px-4 py-2 focus:border-[#4FA3D9] focus:ring-2 focus:ring-opacity-20 focus:ring-[#4FA3D9] transition-all duration-200 w-full pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="bg-white border border-gray-200 rounded-md px-4 py-2 focus:border-[#4FA3D9] focus:ring-2 focus:ring-opacity-20 focus:ring-[#4FA3D9] transition-all duration-200 w-full"
                placeholder="Any specific concerns or requirements..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#4FA3D9] text-white hover:bg-[#7CBAE6] transition-colors duration-200 shadow-sm py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4FA3D9] focus:ring-offset-2"
            >
              Request Appointment
            </button>
          </form>
        </div>
      </div>
      {showToast && (
        <Toast message="Appointment requested successfully!" type="success" />
      )}
    </>
  )
}
